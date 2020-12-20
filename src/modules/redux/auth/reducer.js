import types from './types';

const initialState = {
    loading: false,
    visible: false,
    logged: false,
    user_info: null
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case types.SET_VISIBLE:
            return {
                ...state,
                visible: action.payload
            };

        case types.SET_USER:
            return {
                ...state,
                logged: true,
                user_info: action.payload,
            };
        case types.SIGN_OUT:
            return {
                ...state,
                logged: false,
                user_info: initialState
            };
        default:
            return state;
    }
}