import axios from 'axios';
import config from '../../config/config';

import { notification } from 'antd';

export const setUsers = (data) => ({
    type: 'SET_USERS',
    data
});

export const setPage = (data) => ({
    type: 'SET_PAGE',
    data
});

export const setTotal = (data) => ({
    type: 'SET_TOTAL',
    data
});

export const setLoading = (data) => ({
    type: 'SET_LOADING',
    data
});

export const setPageSize = (data) => ({
    type: 'SET_PAGE_SIZE',
    data
});

export const setActiveItem = (data) => ({
    type: 'SET_ACTIVE_ITEM',
    data
});

export const getUsers = (per_page, page) => {
    return function(dispatch) {
        dispatch(setLoading(true));
        dispatch(setPageSize(per_page));
        dispatch(setPage(page));
        axios.get(`${config.api.base_url_dev}${config.api.users}?per_page=${per_page}&page=${page}`)
        .then(response => {
            dispatch(setLoading(false));
            dispatch(setTotal(response.data.total));
            dispatch(setUsers(response.data.data));
        }).catch(error => {
            dispatch(setLoading(false));
            dispatch(setUsers([]));
            console.log(error);
            notification.error({
                message: 'Error!',
                description: 'Unable to fetch users!',
                duration: 2
            })
        });
    }
}

export const deleteUser = (id, callback) => {
    axios.delete(`${config.api.base_url_dev}${config.api.users}/${id}`)
    .then(response => {
        callback();
    }).catch(error => {
        console.log(error);
        notification.error({
            message: 'Error!',
            description: 'Unable to delete user!',
            duration: 2
        })
    });
}

export const updateUser = (id, data, callback) => {
    axios.patch(`${config.api.base_url_dev}${config.api.users}/${id}`, data)
    .then(response => {
        callback();
    }).catch(error => {
        console.log(error);
        notification.error({
            message: 'Error!',
            description: 'Unable to update user!',
            duration: 2
        })
    });
}