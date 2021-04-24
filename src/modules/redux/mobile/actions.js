import types from './types';

export const setModal = (data) => ({
    type: types.SET_MODAL,
    payload: data,
});