import Xhr from './Xhr';

const URL = {
    test: '/api',
    signIn: '/api/user/login',
    signUp: '/api/user/register',
    isLogged: '/api/user/isLogged',
    logout: '/api/user/logout'
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
