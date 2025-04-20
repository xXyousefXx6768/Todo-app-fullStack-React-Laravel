// actions/modalActions.js
import { SET_OPEN_MODAL, SET_CLOSE_MODAL } from '../types/actiontypes';

export const setOpenModal = (value) => ({
  type: SET_OPEN_MODAL,
  payload: value,
});
export const closeModal = () => ({
  type: SET_CLOSE_MODAL,
  payload: false,
});