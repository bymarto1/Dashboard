import axios from 'axios';

const baseUrl = 'https://nft-dashboard.onrender.com/api/auth/login';

const login = async (credentials) => {
    const { data } = await axios.post(baseUrl, credentials);
    return data;
};

const loginService = { login };

export default loginService;
