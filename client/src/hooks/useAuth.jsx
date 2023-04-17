import React from 'react';
import { Auth } from '../services/auth';
import { useLocation, Navigate } from 'react-router-dom';
import { Role } from '../roles';
import AccessDenied from '../pages/AccessDenied';

let AuthContext = React.createContext(null);
const expired = (token) =>
    Date.now() >= JSON.parse(atob(token.split('.')[1])).exp * 1000;

function AuthProvider({ children }) {
    const [user, setUser] = React.useState(() => {
        const userLocalStorage = JSON.parse(localStorage.getItem('username'));
        return userLocalStorage ? userLocalStorage : null;
    });
    const [token, setToken] = React.useState(() => {
        const tokenLocalStorage = JSON.parse(localStorage.getItem('token'));
        return tokenLocalStorage ? tokenLocalStorage : null;
    });
    const [role, setRole] = React.useState(() => {
        const roleLocalStorage = JSON.parse(localStorage.getItem('role'));
        return roleLocalStorage ? roleLocalStorage : null;
    });

    let signin = (username, password, callback) => {
        return Auth.signin(username, password, () => {
            const t = JSON.parse(localStorage.getItem('token'));
            const r = JSON.parse(localStorage.getItem('role'));
            setRole(r);
            setToken(t);
            setUser(username);
            callback();
        });
    };

    let signout = (callback) => {
        return Auth.signout(() => {
            setToken(null);
            setUser(null);
            callback();
        });
    };

    let value = { user, token, role, signin, signout };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

const useAuth = () => {
    return React.useContext(AuthContext);
};

function RequireAuth({ children, roles }) {
    let auth = useAuth();
    let location = useLocation();

    if (!auth.user && !auth.token) {
        return <Navigate to='/login' state={{ from: location }} replace />;
    }

    const isExpired = expired(auth.token);
    if (isExpired) {
        window.localStorage.removeItem('username');
        window.localStorage.removeItem('role');
        window.localStorage.removeItem('token');
        return <Navigate to='/login' state={{ from: location }} replace />;
    }

    const userHasRequiredRole =
        auth.user && roles.includes(auth.role) ? true : false;

    if (auth.token && !userHasRequiredRole) return <AccessDenied />;

    return children;
}

function AuthStatus() {
    let auth = useAuth();
    return auth.token;
    // let navigate = useNavigate();

    // if (!auth.user) {
    //     return <p>You are not logged in.</p>;
    // }

    // return (
    //     <p>
    //         Welcome {auth.user}!{' '}
    //         <button
    //             onClick={() => {
    //                 auth.signout(() => navigate('/'));
    //             }}
    //         >
    //             Sign out
    //         </button>
    //     </p>
    // );
}

export { useAuth, AuthProvider, RequireAuth, AuthStatus };
