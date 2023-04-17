import axios from 'axios';

const baseUrl = 'http://localhost:13000/api/auth/login';

const login = async (credentials) => {
    const { data } = await axios.post(baseUrl, credentials);
    return data;
};

const loginService = { login };

export default loginService;
