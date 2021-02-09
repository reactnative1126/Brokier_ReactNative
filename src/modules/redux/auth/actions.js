import types from './types';

export const setLoading = (data) => ({
    type: types.SET_LOADING,
    payload: data,
});
export const setVisible = (data) => ({
    type: types.SET_VISIBLE,
    payload: data,
});
export const setVisible1 = (data) => ({
    type: types.SET_VISIBLE1,
    payload: data,
});



export const setUser = (data) => ({
    type: types.SET_USER,
    payload: data,
});
export const signOut = (data) => ({
    type: types.SIGN_OUT,
    payload: data
});

export const setTab = (data) => ({
    type: types.SET_TAB_VISIBLE,
    payload: data
});