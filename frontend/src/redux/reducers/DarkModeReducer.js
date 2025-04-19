import { DARK_MODE } from '../types/actiontypes';

const initialState = {
  isDarkMode: localStorage.getItem('DarkMode') === 'true', // loads from localStorage
};

export default function (state = initialState, action)  {
  switch (action.type) {
    case DARK_MODE:
      return { ...state, isDarkMode: action.payload };
    default:
      return state;
  }
};


