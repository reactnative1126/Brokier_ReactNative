import types from './types';

export const setTabs = (data) => ({
    type: types.SET_TABS,
    payload: data,
});

export const setMobile = (data) => ({
    type: types.SET_MOBILE,
    payload: data,
});

export const setLikes = (data) => ({
    type: types.SET_LIKES,
    payload: data,
});