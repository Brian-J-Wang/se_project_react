import RequestAPI from "./requestAPI";

export default class Auth extends RequestAPI {
    constructor(baseUrl, authorization) {
        super(baseUrl, authorization);
    }

    signUp(name, avatar, email, password) {
        return this._request(this.baseUrl.concat('/signup'),{
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, avatar, email, password })
        });
    }

    signIn(email, password) {
        return this._request(this.baseUrl.concat('/signin'), {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password })
        });
    }

    checkTokenValidity(token) {
        return this._request(this.baseUrl.concat('/users/me'), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            }
        })
    }

    updateUserProfile(name, avatar, token) {
        return this._request(this.baseUrl.concat('/users/me'), {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name, avatar })
        })
    }
}