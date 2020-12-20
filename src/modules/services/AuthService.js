import axios from '../../utils/axios.js';

export const getEmail = (userEmail) => {
    return axios.get(`/users/validate`, {
        params: {
            userEmail: userEmail
        }
    }).then((response) => {
        return response.data;
    });
};

export const setUser1 = (params) => {
    return axios.post(`/users`, {
        name: params.name,
        email: params.email,
        password: params.password,
        role: 'normal',
    }).then((response) => {
        return response.data;
    });
};

export const getUser = (params) => {
    return axios.get(`/users`, {
        params: {
            email: params.email,
            password: params.password
        }
    }).then((response) => {
        return response.data;
    });
};