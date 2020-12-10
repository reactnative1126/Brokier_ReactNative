import types from './types';

export const setLikes = (data) => ({
    type: types.SET_LIKES,
    payload: data,
});