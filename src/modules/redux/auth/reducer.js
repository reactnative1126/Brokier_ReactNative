import types from './types';

const initialState = {
    tabVisible: true,
    logged: false,
    user_info: null
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
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
        case types.SET_TAB_VISIBLE:
            return {
                ...state,
                tabVisible: action.payload
            };
        default:
            return state;
    }
}