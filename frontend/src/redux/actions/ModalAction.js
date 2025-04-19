// actions/modalActions.js
import { SET_OPEN_MODAL } from './modalTypes';

export const setOpenModal = (value) => ({
  type: SET_OPEN_MODAL,
  payload: value,
});
