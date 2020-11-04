import React, { Component } from 'react';

import { DeleteIcon, EditIcon } from '../utils/Icons';
import AppContext from '../store/AppContext';
import { deleteNote, getNoteDetails } from '../utils/ApiActions';

class NoteItem extends Component {
    constructor(props) {
        super(props);
    }

    static contextType = AppContext;

    editNoteHandler = () => {
        let { id, note, timestamp } = this.props.noteEl;
        if (id) {
            typeof this.context.contextReducer == 'function' &&
                this.context.contextReducer({
                    type: 'updateNoteState',
                    triggerType: 'update',
                    id,
                    noteDesc: note,
                    timestamp: Math.floor(timestamp)
                });
        }
    };

    deleteNoteHandler = () => {
        let token = this.context.AppData.curfToken;
        let { id } = this.props.noteEl;
        try {
            if (id && token) {
                const config = {
                    body: {
                        note_id: id
                    },
                    headers: {
                        'XSRF-TOKEN': token
                    }
                };
                deleteNote(config)
                    .then((res) => {
                        if (res.hasOwnProperty('success')) {
                            if (res.success == true) {
                                this.fetchAllNotes();
                            } else if (res.success == false && !!res.errors) {
                                console.log(res);
                            }
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        } catch (error) {
            console.log(error);
        }
    };

    fetchAllNotes = () => {
        try {
            getNoteDetails()
                .then((res) => {
                    if (res.hasOwnProperty('success')) {
                        if (!!res.success) {
                            this.context.contextReducer([
                                {
                                    type: 'updateNotes',
                                    notes: res.notes
                                },
                                {
                                    type: 'resetNoteState'
                                }
                            ]);
                        } else if (!res.success && !!res.errors) {
                            console.log(res);
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
    };

    updateNoteXHR = (config) => {
        try {
            updateNote(config)
                .then((res) => {
                    if (res.hasOwnProperty('success')) {
                        if (res.success == true) {
                            this.fetchAllNotes();
                        } else if (res.success == false && !!res.errors) {
                            console.log(res);
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
    };

    fetchAllNotes = () => {
        try {
            getNoteDetails()
                .then((res) => {
                    if (res.hasOwnProperty('success')) {
                        if (!!res.success) {
                            this.context.contextReducer([
                                {
                                    type: 'updateNotes',
                                    notes: res.notes
                                },
                                {
                                    type: 'resetNoteState'
                                }
                            ]);
                        } else if (!res.success && !!res.errors) {
                            console.log(res);
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
    };

    resetNoteHandler = () => {
        typeof this.context.contextReducer == 'function' &&
            this.context.contextReducer({
                type: 'resetNoteState'
            });
    };

    render() {
        let noteEl = this.props.noteEl;

        return (
            <div key={`note${noteEl.id}`} className="wrap__note-item">
                <div className="wrap__ni-inner">
                    <div className="note-point"></div>
                    <div className="wrap__note-desc">
                        <h1 className="heading__note-desc">{noteEl.note}</h1>
                    </div>
                    <div className="wrap__note-action">
                        <a
                            key={`edit${noteEl.id}`}
                            onClick={() => this.editNoteHandler()}
                            className="btn__note-edit btn__action-comn"
                        >
                            <EditIcon />
                        </a>
                        <a
                            key={`delete${noteEl.id}`}
                            onClick={() => this.deleteNoteHandler()}
                            className="btn__note-delete btn__action-comn"
                        >
                            <DeleteIcon />
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default NoteItem;
