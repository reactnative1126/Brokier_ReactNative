import axios from '@utils/axios';

export default AuthService = {
    getEmail: function (userEmail) {
        return axios.get(`/users/validate`, {
            params: {
                userEmail: userEmail
            }
        }).then((response) => {
            return response.data;
        });
    },
    setUser: function (params) {
        return axios.get(`/users/setUser`, {
            params: {
                unique_id: params.unique_id,
                name: params.name,
                email: params.email,
                password: params.password,
                role: 'regular'
            }
        }).then((response) => {
            return response.data;
        });
    },
    getUser: function (params) {
        return axios.get(`/users/getUser`, {
            params: {
                email: params.email,
                password: params.password
            }
        }).then((response) => {
            return response.data;
        });
    },
    getReferral: function (params) {
        return axios.get(`/users/getReferral`, {
            params: {
                uniqueId: params.uniqueId
            }
        }).then((response) => {
            return response.data;
        });
    },
    updateUser: function (params) {
        return axios.get(`/users/updateUser`, {
            params: {
                user_id: params.user_id,
                unique_id: params.unique_id,
                name: params.name,
                email: params.email,
                brokerage_name: params.brokerage_name,
                phone: params.phone,
                website: params.website,
                instagram_id: params.instagram_id,
                photo: params.photo,
                role: params.role
            }
        }).then((response) => {
            return response.data;
        });
    },
    uploadAvatar: function (data) {
        return axios.get(`/users/uploadAvatar`, {
            params: {
                upload: data
            }
        }).then((response) => {
            return response.data;
        });
    },
}
