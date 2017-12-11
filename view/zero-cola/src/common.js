export function requestGet(url, callback) {
    fetch(url)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                if (response.status === 401) {
                    window.location = '/login';
                }
                else {
                    console.log('something wrong');
                }
                console.log(response);
            }
        })
        .then(response => {
            if (callback) {
                callback(response);
            }
            else {
                return response;
            }
        })
        .catch(function (error) {
            console.log('get a problem: ' + error.message);
        });
}
