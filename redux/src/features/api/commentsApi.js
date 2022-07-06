import axiosClient from './axiosClient';

const commentsApi = {
    getAll: (id) => {
        const url = `/comment/${id}`;
        return axiosClient.get(url);
    },

    addCard: (data) => {
        const url = '/comment/add';
        return axiosClient.post(url, data);
    },
};

export default commentsApi;
