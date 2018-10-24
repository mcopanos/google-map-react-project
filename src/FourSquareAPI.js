
class Api {
    static url() {
        return 'https://api.foursquare.com/v2';
    }

    static apiAuth() {
        const keys = {
            client_id: "EQUAMFAFEV0WAYVG5E4BJD2W0BN2OX5XKARYUJ20D34JFASA",
            client_secret: "5LCD0VJBLOQNR5AG5ODEMGJPLXE1NXQOMV1N40JY544HV3DJ",
            v: "20181004"
        };
        return Object.keys(keys)
            .map(key => `${key}=${keys[key]}`)
            .join("&");
    }

    static builder(params) {
        if (!params) {
            return '';
        }
        return Object.keys(params)
            .map(key => `${key}=${params[key]}`)
            .join('&');
    }

    static headers() {
        return {
            Accept: 'application/json'
        };
    }

    static fetch(endPoint, method, params) {
        let requestData = {
            method,
            headers: Api.headers()
        }
        return fetch(`${Api.url()}${endPoint}?${Api.apiAuth()}&
            ${Api.builder(
                params
            )}`,
            requestData
        ).then(res => res.json())
    }
}

export default class FourSquareAPI {
    static search(params) {
        return Api.fetch('/venues/search', 'GET', params);
    }

    static getVenuesDetails(VENUE_ID) {
        return Api.fetch(`/venues/${VENUE_ID}`, 'GET');
    } 
}