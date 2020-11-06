import Xhr from './Xhr';

const URL = {
    test: '/api',
    signIn: '/api/user/login',
    signUp: '/api/user/register',
    isLogged: '/api/user/isLogged',
    logout: '/api/user/logout',
    createTask: '/api/task/create',
    updateTask: '/api/task/update',
    deleteTask: '/api/task/delete',
    getTaskDetails: '/api/task/all',
    getNoteDetails: '/api/note/all',
    createNote: '/api/note/create',
    updateNote: '/api/note/update',
    deleteNote: '/api/note/delete'
};

const PromiseHandler = (url, config) => {
    const promiseObj = new Promise(function (resolve, reject) {
        Xhr(url, config)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
    return promiseObj;
};

const makePostObj = (payload, method) => {
    return Object.assign({}, payload, {
        method
    });
};

export const signIn = (payload) => {
    const config = makePostObj(payload, 'POST');
    return PromiseHandler(URL.signIn, config);
};

export const signUp = (payload) => {
    const config = makePostObj(payload, 'POST');
    return PromiseHandler(URL.signUp, config);
};

export const isLoggedCheck = () => {
    const config = makePostObj({}, 'GET');
    return PromiseHandler(URL.isLogged, config);
};

export const signOut = () => {
    const config = makePostObj({}, 'GET');
    return PromiseHandler(URL.logout, config);
};

export const createTask = (payload) => {
    const config = makePostObj(payload, 'POST');
    return PromiseHandler(URL.createTask, config);
};

export const updateTask = (payload) => {
    const config = makePostObj(payload, 'POST');
    return PromiseHandler(URL.updateTask, config);
};

export const deleteTask = (payload) => {
    const config = makePostObj(payload, 'POST');
    return PromiseHandler(URL.deleteTask, config);
};

export const getTaskDetails = () => {
    const config = makePostObj({}, 'GET');
    return PromiseHandler(URL.getTaskDetails, config);
};

export const getNoteDetails = () => {
    const config = makePostObj({}, 'GET');
    return PromiseHandler(URL.getNoteDetails, config);
};

export const createNote = (payload) => {
    const config = makePostObj(payload, 'POST');
    return PromiseHandler(URL.createNote, config);
};

export const updateNote = (payload) => {
    const config = makePostObj(payload, 'POST');
    return PromiseHandler(URL.updateNote, config);
};

export const deleteNote = (payload) => {
    const config = makePostObj(payload, 'POST');
    return PromiseHandler(URL.deleteNote, config);
};
