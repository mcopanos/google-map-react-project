class Helper {
    static baseURL() {
        return 'https://api.foursquare.com/v2';
    }

    static auth() {
        const keys = {
            client_id: "EQUAMFAFEV0WAYVG5E4BJD2W0BN2OX5XKARYUJ20D34JFASA",
            client_secret: "5LCD0VJBLOQNR5AG5ODEMGJPLXE1NXQOMV1N40JY544HV3DJ",
            v: "20181004"
        };
        return Object.keys(keys)
            .map(key => `${key}=${keys[key]}`)
            .join("&");
    }

    static urlBuilder(urlParams) {
        if (!urlParams) {
            return '';
        }
        return Object.keys(urlParams)
            .map(key => `${key}=${urlParams[key]}`)
            .join('&');
    }
    static headers() {
        return {
            Accept: 'application/json'
        };
    }

    static simpleFetch(endPoint, method,urlParams) {
        let requestData = {
            method,
            headers: Helper.headers()
        }
        return fetch(`${Helper.baseURL()}${endPoint}?${Helper.auth()}&
            ${Helper.urlBuilder(
                urlParams
            )}`,
            requestData
        ).then(res => res.json())
    }
}

export default class FourSquareAPI {
    static search(urlParams) {
        return Helper.simpleFetch('/venues/search', 'GET', urlParams);
    }
    static getVenuesDetails(VENUE_ID) {
        return Helper.simpleFetch(`/venues/${VENUE_ID}`, 'GET');
    } 
    static getVenuePhotos(VENUE_ID) {
        return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`, 'GET');
    }
}