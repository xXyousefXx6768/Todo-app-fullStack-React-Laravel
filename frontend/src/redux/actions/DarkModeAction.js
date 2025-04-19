import { DARK_MODE } from '../types/actiontypes';

export const toggleDarkMode = () => (dispatch, getState) => {
  const currentMode = getState().theme.isDarkMode;
  const newMode = !currentMode;

  localStorage.setItem('DarkMode', newMode);
  dispatch({
    type: DARK_MODE,
    payload: newMode,
  });
};
