import { tokenKey } from './config';

export function request(url, options) {
    return fetch(url)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                if (response.status === 401) {
                    window.localStorage.removeItem(tokenKey);
                    window.location = '/login';
                }
                else {
                    console.log('something wrong');
                }
                console.log(response);
            }
        })
        .catch(function (error) {
            console.log('get a problem: ' + error.message);
        });
}
