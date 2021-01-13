import types from './types';

const initialState = {
    tabs: true,
    mobile: false,
    likes: []
};

export default function listsReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_TABS:
            return {
                ...state,
                tabs: action.payload,
            };
        case types.SET_MOBILE:
            return {
                ...state,
                mobile: action.payload,
            };
        case types.SET_LIKES:
            return {
                ...state,
                likes: action.payload,
            };
        default:
            return state;
    }
}