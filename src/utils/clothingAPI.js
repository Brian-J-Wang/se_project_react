export default class ClothingAPI {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    getClothing() {
        return fetch(this.baseUrl.concat('/items'), {
            method: "GET"
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject('invalid data');
            }
        });
    }

    addClothing(data) {
        return fetch(this.baseUrl.concat('/items'), {
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
        }).then((res) => {
            if (res.ok) {
                return res.json();  
            } else {
                return Promise.reject('invalid data');
            }
        })
    }

    removeClothing(id) {
        return fetch(this.baseUrl.concat(`/items/${id}`), {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject('invalid data');
            }
        })
    }
    
}
