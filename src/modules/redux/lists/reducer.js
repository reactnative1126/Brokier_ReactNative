import types from './types';

const initialState = {
    likes: []
};

export default function listsReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_LIKES:
            return {
                ...state,
                likes: action.payload,
            };
        default:
            return state;
    }
}