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

                let findDate = new Date(timestamp),
                    findTS = new Date(
                        findDate.getFullYear(),
                        findDate.getMonth(),
                        findDate.getDate()
                    ).getTime();
                if (derivedTS == findTS) return true;
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

export const FilterNotes = (params) => {
    let { notes, timestamp } = params;

    if (timestamp && notes) {
        let tempNotes = notes.filter((note) => {
            let noteTS = note.timestamp ? Math.floor(note.timestamp) : null;
            if (noteTS) {
                let noteDate = new Date(noteTS),
                    derivedTS = new Date(
                        noteDate.getFullYear(),
                        noteDate.getMonth(),
                        noteDate.getDate()
                    ).getTime();

                let findDate = new Date(timestamp),
                    findTS = new Date(
                        findDate.getFullYear(),
                        findDate.getMonth(),
                        findDate.getDate()
                    ).getTime();
                if (derivedTS == findTS) return true;
                else return false;
            } else return false;
        });
        return tempNotes;
    }
    return [];
};
