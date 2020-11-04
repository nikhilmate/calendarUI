const Note = require('../models').Note;

const UTILS = {
    validNoteDetails: (NotesObj) => {
        let note = NotesObj['note'] ? NotesObj['note'].trim() : false;
        let timestamp = NotesObj['timestamp'] ? NotesObj['timestamp'] : false;

        if (note && timestamp) {
            return Object.assign(
                {},
                {
                    note,
                    timestamp
                }
            );
        } else return null;
    },
    getValidUpdateNoteDetails: (NotesObj) => {
        try {
            let NoteDetails = new Object(),
                note = NotesObj['note'] ? NotesObj['note'].trim() : false;
            let timestamp = NotesObj['timestamp']
                ? NotesObj['timestamp']
                : false;

            if (note) {
                NoteDetails = Object.assign(NoteDetails, { note });
            }
            if (timestamp) {
                NoteDetails = Object.assign(NoteDetails, { timestamp });
            }
            return NoteDetails;
        } catch (error) {
            console.log(error);
        }
    }
};

module.exports = {
    async createNote(req, res) {
        let { email } = req.user.get();
        try {
            let validNote = UTILS.validNoteDetails(req.body);
            if (!!validNote) {
                validNote = Object.assign(validNote, {
                    user_email: email
                });
                note = await Note.create(validNote);
                if (!!note) {
                    return res.status(201).json({
                        success: true,
                        note
                    });
                } else {
                    return res.status(401).json({
                        success: false,
                        errors: ['Note not created']
                    });
                }
            } else {
                return res.status(401).json({
                    success: false,
                    errors: ['Note not valid']
                });
            }
        } catch (error) {
            console.log(error);
            return res.status(401).json({
                success: false,
                errors: ['Note not created']
            });
        }
    },
    async getNoteDetails(req, res) {
        try {
            const noteData = await req.user.getNotes();
            if (!!noteData) {
                return res.status(200).json({
                    success: true,
                    notes: noteData
                });
            } else {
                return res.status(401).json({
                    success: false,
                    errors: ['Note not found']
                });
            }
        } catch (error) {
            return res.status(401).json({
                success: false,
                errors: ['trouble getting the user data']
            });
        }
    },
    async updateNote(req, res) {
        try {
            let noteId = req.body.note_id;
            if (!!noteId) {
                let validNote = UTILS.getValidUpdateNoteDetails(req.body);
                Note.update(validNote, {
                    where: {
                        id: noteId
                    }
                }).then((updateInstance) => {
                    if (
                        !!updateInstance &&
                        typeof updateInstance[0] == 'number' &&
                        updateInstance[0] > 0
                    ) {
                        Note.findOne({
                            where: {
                                id: noteId
                            }
                        }).then((findInstance) => {
                            if (!!findInstance) {
                                return res.status(201).json({
                                    success: true,
                                    note: findInstance
                                });
                            } else {
                                return res.status(401).json({
                                    success: false,
                                    errors: ['Note not updated']
                                });
                            }
                        });
                    } else {
                        return res.status(401).json({
                            success: false,
                            errors: ['Note not updated']
                        });
                    }
                });
            } else {
                return res.status(401).json({
                    success: false,
                    errors: ['Note not found']
                });
            }
        } catch (error) {
            console.log(error);
            return res.status(401).json({
                success: false,
                errors: ['Note not updated']
            });
        }
    },
    async deleteNote(req, res) {
        try {
            let noteId = req.body.note_id;
            if (!!noteId) {
                Note.destroy({
                    where: {
                        id: noteId
                    }
                }).then((deleteInstance) => {
                    if (!!deleteInstance) {
                        Note.findOne({
                            where: {
                                id: noteId
                            }
                        }).then((findInstance) => {
                            if (!!findInstance) {
                                return res.status(401).json({
                                    success: false,
                                    note: findInstance,
                                    errors: ['Note not deleted']
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
                            errors: ['Note not found or not deleted']
                        });
                    }
                });
            } else {
                return res.status(401).json({
                    success: false,
                    errors: ['Note not found']
                });
            }
        } catch (error) {
            console.log(error);
            return res.status(401).json({
                success: false,
                errors: ['Note not deleted']
            });
        }
    }
};
