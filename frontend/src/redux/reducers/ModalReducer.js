// reducers/modalReducer.js
import { SET_OPEN_MODAL, SET_CLOSE_MODAL } from '../types/actiontypes';

const initialState = {
  openModal: null,
};

 export default function (state = initialState, action)  {
  switch (action.type) {
    case SET_OPEN_MODAL:
      return { ...state, openModal: action.payload };
      case SET_CLOSE_MODAL:
        return { ...state, openModal: null };
    default:
      return state;
  }
};

