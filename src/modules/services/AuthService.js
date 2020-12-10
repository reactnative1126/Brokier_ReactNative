import axios from '@utils/axios';

export default AuthService = {
    getEmail: async function (userEmail) {
        return await axios.get(`/users/validate`, {
            params: {
                userEmail: userEmail
            }
        }).then((response) => {
            return response.data;
        });
    },
    setUser: async function (params) {
        return await axios.post(`/users`, {
            name: params.name,
            email: params.email,
            password: params.password,
            role: 'normal',
        }).then((response) => {
            return response.data;
        });
    },

    getUser: async function (params) {
        return await axios.get(`/users`, {
            params: {
                email: params.email,
                password: params.password
            }
        }).then((response) => {
            return response.data;
        });
    },
}
