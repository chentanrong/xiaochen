export default class FeatchHelper {

    request= (url, method, body)=> {

        body = body && JSON.stringify(body);

        return fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body
        })
    }

    static get = url =>this. request(url, 'GET');
    static post = (url, body) => {
        body = body && JSON.stringify(body);
        return fetch(url, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body
        })
    };
    static put = (url, body) => this.request(url, 'PUT', body);
    static del = (url, body) => this.request(url, 'DELETE', body);
}