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
    getTaskDetails: '/api/task/all'
};

export const signIn = (payload) => {
    const config = Object.assign({}, payload, {
        method: 'POST'
    });
    var promise = new Promise(function (resolve, reject) {
        Xhr(URL.signIn, config)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
    return promise;
};

export const signUp = (payload) => {
    const config = Object.assign({}, payload, {
        method: 'POST'
    });
    var promise = new Promise(function (resolve, reject) {
        Xhr(URL.signUp, config)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
    return promise;
};

export const isLoggedCheck = () => {
    const config = Object.assign(
        {},
        {
            method: 'GET'
        }
    );
    var promise = new Promise(function (resolve, reject) {
        Xhr(URL.isLogged, config)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
    return promise;
};

export const signOut = () => {
    const config = Object.assign(
        {},
        {
            method: 'GET'
        }
    );
    var promise = new Promise(function (resolve, reject) {
        Xhr(URL.logout, config)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
    return promise;
};

export const createTask = (payload) => {
    const config = Object.assign({}, payload, {
        method: 'POST'
    });
    var promise = new Promise(function (resolve, reject) {
        Xhr(URL.createTask, config)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
    return promise;
};

export const updateTask = (payload) => {
    const config = Object.assign({}, payload, {
        method: 'POST'
    });
    var promise = new Promise(function (resolve, reject) {
        Xhr(URL.updateTask, config)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
    return promise;
};

export const deleteTask = (payload) => {
    const config = Object.assign({}, payload, {
        method: 'POST'
    });
    var promise = new Promise(function (resolve, reject) {
        Xhr(URL.deleteTask, config)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
    return promise;
};

export const getTaskDetails = () => {
    const config = Object.assign(
        {},
        {
            method: 'GET'
        }
    );
    var promise = new Promise(function (resolve, reject) {
        Xhr(URL.getTaskDetails, config)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
    return promise;
};
