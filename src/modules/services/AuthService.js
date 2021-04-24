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
    return axios.post(`/users/user`, {
        unique_id: params.unique_id,
        name: params.name,
        email: params.email,
        password: params.password,
        role: 'regular'
    }).then((response) => {
        return response.data;
    });
};

export const getUser = (params) => {
    return axios.get(`/users/user`, {
        params: {
            email: params.email,
            password: params.password
        }
    }).then((response) => {
        return response.data;
    });
};

export const getAgent = (params) => {
    return axios.get(`/users/agent`, {
        params: {
            uniqueId: params.agentId
        }
    }).then((response) => {
        return response.data;
    });
};

export const updateUser = (params) => {
    return axios.post(`/users/updateUser`, {
        user_id: params.user_id,
        unique_id: params.unique_id,
        name: params.name,
        email: params.email,
        brokerage_name: params.brokerage_name,
        phone: params.phone,
        website: params.website,
        instagram_id: params.instagram_id,
        photo: params.photo,
        role: params.role,
        agent_unique_id: params.agent_unique_id
    }).then((response) => {
        return response.data;
    });
};

export const getReferral = (params) => {
    return axios.get(`/users/referral`, {
        params: {
            uniqueId: params.uniqueId
        }
    }).then((response) => {
        return response.data;
    });
};