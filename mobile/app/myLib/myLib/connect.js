function connect(baseUrl) {

    return {
        login
    }

    function _fetch(url, config) {
        return fetch('https://' + baseUrl + url, config);
    }

    function post(url, data) {
        return _fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

    /**
     * 
     * @param {string} username 
     * @param {string} password
     * @returns {Promise<string>} token 
     */
    function login(username, password) {
        return post('/login', { username, password })
            .then(response => response.ok ? response.json() : Promise.reject(response.json()))
            .then(({ token }) => token.split('-').pop());
    }
}

connect.actions = {};

export default connect;