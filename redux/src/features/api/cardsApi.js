import axiosClient from './axiosClient';

const cardsApi = {
    getAll: () => {
        const url = '/card/';
        console.log('url', url);
        return axiosClient.get(url);
    },
    get: (id) => {
        const url = `/card/${id}`;
        return axiosClient.get(url);
    },
    addCard: (data) => {
        const url = '/card/add';
        return axiosClient.post(url, data);
    },
    // update
    updateHeart: (id, data) => {
        const url = `/heart/${id}`;
        return axiosClient.post(url, data);
    },
    updateCard: (id, data) => {
        const url = `/card/${id}`;
        return axiosClient.put(url, data);
    },
    deleteCard: (id) => {
        const url = `/card/${id}`;
        return axiosClient.delete(url);
    },
    upload: (file) => {
        const url = '/image/upload';
        return axiosClient.post(url, file);
    },
    upload1: (file) => {
        const url = '/image/upload1';
        return axiosClient.post(url, file);
    },
    destroyCard: (id) => {
        const url = `/card/destroy/${id}`;
        return axiosClient.delete(url);
    },
    restoreCard: (id) => {
        const url = `/card/restore/${id}`;
        return axiosClient.patch(url);
    },
};

export default cardsApi;
