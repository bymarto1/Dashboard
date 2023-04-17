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

const dashboardService = { updateConfig, getCurrentConfig };

export default dashboardService;
