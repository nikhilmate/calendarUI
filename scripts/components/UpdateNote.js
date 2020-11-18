import React, { Component } from 'react';

import { CloseBtnIcon } from '../utils/Icons';
import AppContext from '../store/AppContext';
import { createNote, getNoteDetails, updateNote } from '../utils/ApiActions';

class UpdateNote extends Component {
    constructor(props) {
        super(props);
        let actionNote = this.props.actionNote;
        this.state = {
            triggerType: actionNote.triggerType,
            id: actionNote.id,
            noteDesc: actionNote.noteDesc
        };
    }

    static contextType = AppContext;

    noteInputHandler = (e) => {
        this.setState({
            noteDesc: e.currentTarget.value
        });
    };

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState !== this.state) {
            return true;
        }
        return false;
    }

    finalNoteHandler = (triggerType, id) => {
        let noteDesc = this.state.noteDesc,
            { ts } = this.context.AppData.taskState.taskWidget,
            timestamp = ts ? Math.floor(ts) : new Date().getTime(),
            token = this.context.AppData.curfToken;
        switch (triggerType) {
            case 'create':
                if (
                    typeof noteDesc == 'string' &&
                    noteDesc.length > 0 &&
                    timestamp
                ) {
                    this.createNoteXHR({
                        body: {
                            note: noteDesc,
                            timestamp
                        },
                        headers: {
                            'XSRF-TOKEN': token
                        }
                    });
                }
                break;

            case 'update':
                if (
                    typeof noteDesc == 'string' &&
                    noteDesc.length > 0 &&
                    timestamp &&
                    id
                ) {
                    this.updateNoteXHR({
                        body: {
                            note: noteDesc,
                            timestamp,
                            note_id: id
                        },
                        headers: {
                            'XSRF-TOKEN': token
                        }
                    });
                }
                break;

            default:
                break;
        }
    };

    createNoteXHR = (config) => {
        try {
            createNote(config)
                .then((res) => {
                    if (res.hasOwnProperty('success')) {
                        if (res.success == true) {
                            this.fetchAllNotes();
                            this.resetNoteHandler();
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
        let createTrigger = this.state.triggerType === 'create',
            { ts } = this.context.AppData.taskState.taskWidget,
            timestamp = ts ? Math.floor(ts) : new Date().getTime(),
            { noteDesc, triggerType, id } = this.state;

        return (
            <div className="noteChangeOverlay">
                <div
                    key={`updateNote${timestamp}`}
                    className={
                        'wrap__note-item ' +
                        (createTrigger ? 'createNote' : 'updateNote')
                    }
                >
                    <div className="wrap__ni-inner">
                        <div className="note-point"></div>
                        <div className="wrap__note-desc">
                            <input
                                value={noteDesc ? noteDesc : ''}
                                autoComplete="off"
                                type="text"
                                className="input__note-desc"
                                id="input__note-desc"
                                name="input__note-desc"
                                onChange={this.noteInputHandler}
                                placeholder="Enter a Note..."
                            />
                        </div>
                        <div className="wrap__note-action">
                            <button
                                onClick={() =>
                                    this.finalNoteHandler(triggerType, id)
                                }
                                className="btn__save btn__action-comn"
                            >
                                {createTrigger ? 'Create' : 'Save'}
                            </button>
                            <a
                                onClick={() => this.resetNoteHandler()}
                                className="btn__note-delete btn__action-comn"
                            >
                                <CloseBtnIcon />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdateNote;
