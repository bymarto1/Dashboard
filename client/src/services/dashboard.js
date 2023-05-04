import axios from 'axios';

const baseUrl = 'http://localhost:13000/api/dashboard';

const updateConfig = async (newConfig, token) => {

    const { generalWebhook, groupName, groupImage,  delay } = newConfig;
    const response = await axios({
        url: '/config',
        method: 'put',
        baseURL: baseUrl,
        data: {
            groupName: groupName,
            generalWebhook: generalWebhook,
            generalDelay: delay,
            groupImage : groupImage
        },
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.status;
};

const getCurrentConfig = async (token) => {
    const { data } = await axios({
        url: '/config',
        method: 'get',
        baseURL: baseUrl,
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

const getDashboardInfo = async(token)=> {
    const { data } = await axios({
        url: '/',
        method: 'get',
        baseURL: baseUrl,
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
}

const getPerformance = async(token)=> {
    const { data } = await axios({
        url: '/performance',
        method: 'get',
        baseURL: baseUrl,
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
}

const getPaymentInfo = async(token)=> {
    const { data } = await axios({
        url: '/payment',
        method: 'get',
        baseURL: baseUrl,
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
}
const payRenewal = async (transactionHash, price,token) => {
    const response = await axios({
        url: '/payment',
        method: 'post',
        baseURL: baseUrl,
        data: {
            transactionHash: transactionHash,
            price : price
        },
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.status;
};
const dashboardService = { updateConfig, getCurrentConfig , getDashboardInfo, getPerformance, getPaymentInfo ,payRenewal};

export default dashboardService;
