export default class RequestAPI {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    _request(url, options) {
        return fetch(url, options).then(this._checkResponse);
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject('invalid data');
        }
    }
}