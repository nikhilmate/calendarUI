export const FilterTasks = (params) => {
    let { tasks, timestamp, type } = params;

    if (timestamp && tasks) {
        let tempTasks = tasks.filter((task) => {
            let taskTS = task.timestamp ? Math.floor(task.timestamp) : null;
            if (taskTS) {
                let taskDate = new Date(taskTS),
                    derivedTS = new Date(
                        taskDate.getFullYear(),
                        taskDate.getMonth(),
                        taskDate.getDate()
                    ).getTime();
                if (derivedTS == timestamp) return true;
                else return false;
            } else return false;
        });
        switch (type) {
            case 'assign':
                let assignTasks = tempTasks.filter((task) => {
                    if (!JSON.parse(task.isFinished)) {
                        return true;
                    } else return false;
                });
                return assignTasks;
            case 'complete':
                let completeTasks = tempTasks.filter((task) => {
                    if (JSON.parse(task.isFinished)) {
                        return true;
                    } else return false;
                });
                return completeTasks;
            case 'all':
                return tempTasks;
            default:
                return [];
        }
    }
    return [];
};
