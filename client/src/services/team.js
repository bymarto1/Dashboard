import axios from 'axios';

const baseUrl = 'http://localhost:13000/api/team';

const getAllStaffTask = async (token) => {
    const { data } = await axios({
        url: '/all',
        method: 'get',
        baseURL: baseUrl,
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

const addNewStaffTask = async (staffInfo, token) => {
    const { username, discord } = staffInfo;
  
    return axios({
      url: '/staff',
      method: 'post',
      baseURL: baseUrl,
      data: {
        username: username,
        discord: discord,
      },
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log(response.data); // Log the JSON data to the console
        return {
          status: response.status,
          data: response.data,
        };
      })
      .catch((error) => {
        console.error('Error:', error);
        return {
          status: error.response ? error.response.status : 500,
          data: null,
        };
      });
  };
    const deleteOldStaffTask = async ( staffId , token) => {
        console.log(token , staffId)
        const { status } = await axios({
            url: '/staff/'+ staffId,
            method: 'delete',
            baseURL: baseUrl,
            headers: { Authorization: `Bearer ${token}` },
        });
        return status;
    };

const teamService = {
    getAllStaffTask,
    addNewStaffTask,
    deleteOldStaffTask

};

export default teamService;
