import axios from '../../utils/axios.js';

class AuthService {
    async getEmail(userEmail) {
        return await axios.get(`/users/validate`, {
            params: {
                userEmail: userEmail
            }
        }).then((response) => {
            return response.data;
        });
    };

    async setUser(params) {
        return await axios.post(`/users`, {
            name: params.name,
            email: params.email,
            password: params.password,
            role: 'normal',
        }).then((response) => {
            return response.data;
        });
    };

    async getUser(params) {
        return await axios.get(`/users`, {
            params: {
                email: params.email,
                password: params.password
            }
        }).then((response) => {
            return response.data;
        });
    };
}

export default AuthService;