import types from './types';

const initialState = {
    modal: true,
};

export default function mobileReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_MODAL:
            return {
                ...state,
                modal: action.payload
            };
        default:
            return state;
    }
}