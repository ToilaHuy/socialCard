import axiosClient from './axiosClient';

const cardsApi = {
    getAll: () => {
        const url = '/card/';
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
    updateHeart: (id) => {
        const url = `/card/heart/${id}`;
        return axiosClient.put(url);
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
    revertCard: (id) => {
        const url = `/card/revert/${id}`;
        return axiosClient.put(url);
    },
};

export default cardsApi;
