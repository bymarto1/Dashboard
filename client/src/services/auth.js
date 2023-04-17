import loginService from './login';

const Auth = {
    isAuthenticated: false,
    async signin(username, password, callback) {
        Auth.isAuthenticated = true;

        const user = await loginService.login({
            username,
            password,
        });

        window.localStorage.setItem('username', JSON.stringify(user.username));
        window.localStorage.setItem('role', JSON.stringify(user.role));
        window.localStorage.setItem('token', JSON.stringify(user.token));

        callback();
    },
    signout(callback) {
        Auth.isAuthenticated = false;
        window.localStorage.removeItem('username');
        window.localStorage.removeItem('role');
        window.localStorage.removeItem('token');

        callback();
    },
};

export { Auth };
