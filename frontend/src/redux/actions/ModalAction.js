// actions/modalActions.js
import { SET_OPEN_MODAL, SET_CLOSE_MODAL } from '../types/actiontypes';

export const setOpenModal = (modalName) => ({
  type: SET_OPEN_MODAL,
  payload: modalName,
});
export const closeModal = () => ({
  type: SET_CLOSE_MODAL,
});