export default class ClothingAPI {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    getClothing() {
        return this._request(this.baseUrl.concat('/items'), {
            method: "GET"
        });
    }

    addClothing(data) {
        return this._request(this.baseUrl.concat('/items'), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                _id: data._id,
                name: data.name,
                weather: data.weather,
                imageUrl: data.imageUrl
            })
        })
    }

    removeClothing(id) {
        return this._request(this.baseUrl.concat(`/items/${id}`),{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
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
