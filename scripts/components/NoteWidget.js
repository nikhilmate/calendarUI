import React, { Component } from 'react';

import AppContext from '../store/AppContext';

import { NotesIcon } from '../utils/Icons';
import NoteItem from './NoteItem';
import UpdateNote from './UpdateNote';

class NoteWidget extends Component {
    constructor(props) {
        super(props);
    }

    static contextType = AppContext;

    filterNotes = (notes, timestamp) => {
        let notesArr = [];
        if (timestamp) {
            notesArr = notes.filter((note) => {
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
            return notesArr;
        }
        return [];
    };

    render() {
        let { ts } = this.context.AppData.taskState.taskWidget;
        let parsedData = this.context.AppData.noteManager.notes,
            actionNote = this.context.AppData.noteState,
            widgetTS = ts ? ts : new Date().getTime();

        const filterData = this.filterNotes(parsedData, widgetTS);

        let { timestamp, triggerType } = actionNote,
            createTrigger = timestamp && triggerType && triggerType == 'create',
            updateTrigger = timestamp && triggerType && triggerType == 'update',
            checkBoth = createTrigger || updateTrigger;

        return (
            <div key={`mainWrap`} className="wrap_temp1">
                {filterData && filterData.length > 0 ? (
                    <div key="noteList1" className="wrap__task-list">
                        {filterData.map((noteEl) => (
                            <NoteItem key={noteEl.id} noteEl={noteEl} />
                        ))}
                        {checkBoth && <UpdateNote actionNote={actionNote} />}
                    </div>
                ) : checkBoth ? (
                    <div key="noteList2" className="wrap__task-list">
                        <UpdateNote actionNote={actionNote} />
                    </div>
                ) : (
                    <div key={`notfound`} className="wrap__not-found">
                        <div className="wrap__nf-icon">
                            <NotesIcon />
                        </div>
                        <h1 className="wrap__nf-desc">Not Found.</h1>
                    </div>
                )}
            </div>
        );
    }
}

export default NoteWidget;
