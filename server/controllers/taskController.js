const Task = require('../models').Task;

const UTILS = {
    validTaskDetails: (taskObj) => {
        let description = taskObj['description']
            ? taskObj['description'].trim()
            : false;
        let timestamp = taskObj['timestamp'] ? taskObj['timestamp'] : false;
        let isFinished =
            taskObj['isFinished'] && typeof taskObj['isFinished'] == 'boolean'
                ? taskObj['isFinished']
                : false;

        if (description && timestamp) {
            return Object.assign(
                {},
                {
                    description,
                    timestamp,
                    isFinished
                }
            );
        } else return null;
    },
    getValidUpdateTaskDetails: (taskObj) => {
        try {
            let TaskDetails = new Object(),
                description = taskObj['description']
                    ? taskObj['description'].trim()
                    : false;
            let timestamp = taskObj['timestamp'] ? taskObj['timestamp'] : false;
            let isFinished =
                taskObj['isFinished'] &&
                typeof taskObj['isFinished'] == 'boolean'
                    ? taskObj['isFinished']
                    : false;

            TaskDetails = Object.assign(TaskDetails, { isFinished });
            if (description) {
                TaskDetails = Object.assign(TaskDetails, { description });
            }
            if (timestamp) {
                TaskDetails = Object.assign(TaskDetails, { timestamp });
            }
            return TaskDetails;
        } catch (error) {
            console.log(error);
        }
    }
};

module.exports = {
    async createTask(req, res) {
        let { email } = req.user.get();
        try {
            let validTask = UTILS.validTaskDetails(req.body);
            if (!!validTask) {
                validTask = Object.assign(validTask, {
                    user_email: email
                });
                task = await Task.create(validTask);
                if (!!task) {
                    return res.status(201).json({
                        success: true,
                        task
                    });
                } else {
                    return res.status(401).json({
                        success: false,
                        errors: ['Task not created']
                    });
                }
            } else {
                return res.status(401).json({
                    success: false,
                    errors: ['Task not valid']
                });
            }
        } catch (error) {
            console.log(error);
            return res.status(401).json({
                success: false,
                errors: ['Task not created']
            });
        }
    },
    async getTaskDetails(req, res) {
        try {
            const taskData = await req.user.getTasks();
            if (!!taskData) {
                return res.status(200).json({
                    success: true,
                    tasks: taskData
                });
            } else {
                return res.status(401).json({
                    success: false,
                    errors: ['Task not found']
                });
            }
        } catch (error) {
            return res.status(401).json({
                success: false,
                errors: ['trouble getting the user data']
            });
        }
    },
    async updateTask(req, res) {
        try {
            let taskId = req.body.task_id;
            if (!!taskId) {
                let validTask = UTILS.getValidUpdateTaskDetails(req.body);
                Task.update(validTask, {
                    where: {
                        id: taskId
                    }
                }).then((updateInstance) => {
                    if (
                        !!updateInstance &&
                        typeof updateInstance[0] == 'number' &&
                        updateInstance[0] > 0
                    ) {
                        Task.findOne({
                            where: {
                                id: taskId
                            }
                        }).then((findInstance) => {
                            if (!!findInstance) {
                                return res.status(201).json({
                                    success: true,
                                    task: findInstance
                                });
                            } else {
                                return res.status(401).json({
                                    success: false,
                                    errors: ['Task not updated']
                                });
                            }
                        });
                    } else {
                        return res.status(401).json({
                            success: false,
                            errors: ['Task not updated']
                        });
                    }
                });
            } else {
                return res.status(401).json({
                    success: false,
                    errors: ['Task not found']
                });
            }
        } catch (error) {
            console.log(error);
            return res.status(401).json({
                success: false,
                errors: ['Task not updated']
            });
        }
    },
    async deleteTask(req, res) {
        try {
            let taskId = req.body.task_id;
            if (!!taskId) {
                Task.destroy({
                    where: {
                        id: taskId
                    }
                }).then((deleteInstance) => {
                    if (!!deleteInstance) {
                        Task.findOne({
                            where: {
                                id: taskId
                            }
                        }).then((findInstance) => {
                            if (!!findInstance) {
                                return res.status(401).json({
                                    success: false,
                                    task: findInstance,
                                    errors: ['Task not deleted']
                                });
                            } else {
                                return res.status(201).json({
                                    success: true,
                                    response: deleteInstance
                                });
                            }
                        });
                    } else {
                        return res.status(401).json({
                            success: false,
                            errors: ['Task not found or not deleted']
                        });
                    }
                });
            } else {
                return res.status(401).json({
                    success: false,
                    errors: ['Task not found']
                });
            }
        } catch (error) {
            console.log(error);
            return res.status(401).json({
                success: false,
                errors: ['Task not deleted']
            });
        }
    }
};
