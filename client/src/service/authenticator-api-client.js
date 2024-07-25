const url = 'http://localhost:8080/account/getToken'

const authenticatorClient = {
    isAuthenticated: false,

    login: function (uname, pwd) {
        return new Promise((resolve, reject) => {
            const data = new URLSearchParams();
            data.append('username', uname);
            data.append('password', pwd);
            let fData = {
                method: "POST",
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                body: data
            };

            fetch(url, fData).then((response) => {
                response.json().then((data) => {
                    if(data.success) {
                        localStorage.setItem('im_access_token', data.token);
                        this.isAuthenticated = true;
                        resolve("Login Success");
                    } else {
                        reject(data.message);
                    }
                }).catch((err) => {
                    reject("Parsing Error");
                })
            }).catch((err) => {
                reject("Communication Error");
            });
        });
    },

    getToken: function () {
        return localStorage.getItem('im_access_token');
    },
};

export default authenticatorClient;