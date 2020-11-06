export const FilterTasks = (params) => {
    let { tasks, timestamp, type } = params;

    if (timestamp && tasks) {
        let tempTasks = tasks.filter((task) => {
            let taskTS = task.timestamp ? Math.floor(task.timestamp) : null;
            if (taskTS) {
                let matchBothTS = matchBothTimeStamp(taskTS, timestamp);
                if (matchBothTS) return true;
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

    if (timestamp && notes && notes.length > 0) {
        let tempNotes = notes.filter((note) => {
            let noteTS = note.timestamp ? Math.floor(note.timestamp) : null;
            if (noteTS) {
                let matchBothTS = matchBothTimeStamp(noteTS, timestamp);
                if (matchBothTS) return true;
                else return false;
            } else return false;
        });
        return tempNotes;
    }
    return [];
};

const matchBothTimeStamp = (ts__a, ts__b) => {
    let temp__a = new Date(ts__a),
        derived__a = new Date(
            temp__a.getFullYear(),
            temp__a.getMonth(),
            temp__a.getDate()
        ).getTime();

    let temp__b = new Date(ts__b),
        derived__b = new Date(
            temp__b.getFullYear(),
            temp__b.getMonth(),
            temp__b.getDate()
        ).getTime();
    if (derived__a == derived__b) return true;
    else return false;
};
