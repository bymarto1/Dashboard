import axios from 'axios';

const baseUrl = 'https://nft-dashboard.onrender.com/api/blur';

const getAllListingTasks = async (token) => {
    const { data } = await axios({
        url: '/listing',
        method: 'get',
        baseURL: baseUrl,
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

const addNewListingTask = async (collectionInfo, token) => {
    const { collectionSlug, rarity, maxPrice, minRarity, webhook } =
        collectionInfo;
    var collection = collectionSlug
    const { status } = await axios({
        url: '/listing',
        method: 'post',
        baseURL: baseUrl,
        data: {
            collection: collection,
            rarity: rarity,
            pricelimit: maxPrice,
            raritylimit: minRarity,
            webhook: webhook,
        },
        headers: { Authorization: `Bearer ${token}` },
    });
    return status;
};
    const deleteOldListingTask = async ( collectionId , token) => {
        console.log(token , collectionId)
        const { status } = await axios({
            url: '/listing/'+ collectionId,
            method: 'delete',
            baseURL: baseUrl,
            headers: { Authorization: `Bearer ${token}` },
        });
        return status;
    };

const blurService = {
    getAllListingTasks,
    addNewListingTask,
    deleteOldListingTask

};

export default blurService;
