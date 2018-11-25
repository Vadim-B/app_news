class CustomHttp {
    get(url, callback) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    callback(data)
                })
                .catch(error => reject(error));
        });
    }
}