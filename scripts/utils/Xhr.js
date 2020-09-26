export default function (url, config) {
    const tempPayload =
        config && JSON.stringify(config) == JSON.stringify({})
            ? { headers: {} }
            : config.hasOwnProperty('headers')
            ? config
            : Object.assign(config, { headers: {} });
    const payload = Object.assign(tempPayload, {
        headers: Object.assign(tempPayload.headers, {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        })
    });
    if (payload.body) payload.body = JSON.stringify(payload.body);

    return new Promise(function (resolve, reject) {
        try {
            fetch(url, payload)
                .then((response) => response.json())
                .then((res) => {
                    if (res.status >= 300) {
                        reject(res);
                    }
                    if (res.status === 204)
                        reject({
                            success: false,
                            errors: ['Not Found']
                        });
                    resolve(res);
                })
                .catch((res) => {
                    reject({
                        success: false,
                        response: res,
                        errors: ['Request not fulfilled']
                    });
                });
        } catch (err) {
            console.log(err);
            reject({
                success: false,
                errors: ['Request not fulfilled']
            });
        }
    });
}
