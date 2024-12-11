import RequestAPI from "./requestAPI";

export default class ClothingAPI extends RequestAPI {
    constructor(baseUrl) {
        super(baseUrl);
    }

    getClothing() {
        return this._request(this.baseUrl.concat('/items'), {
            method: "GET",
        });
    }

    addClothing(data, token) {
        return this._request(this.baseUrl.concat('/items'), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                _id: data._id,
                name: data.name,
                weather: data.weather,
                imageUrl: data.imageUrl
            })
        })
    }

    removeClothing(id, token) {
        return this._request(this.baseUrl.concat(`/items/${id}`),{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            }
        });
    }

    addCardLike(id, token) {
        return this._request(this.baseUrl.concat(`/items/${id}/likes`), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            }
        })
    }

    removeCardLike(id, token) {
        return this._request(this.baseUrl.concat(`/items/${id}/likes`), {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            }
        })
    }
}
