import { 
    REGISTER_DONE,
    LOGIN_DONE,
    REGISTER_FAIL,
    LOGIN_FAIL,
    LOGOUT_DONE,
    UPDATE_USER_INFO
} from "../types/actiontypes";

import { ADD_TODO, GET_TODOS } from "../types/actiontypes";
const LARAVEL_SERVER=JSON.stringify(import.meta.env.VITE_LARAVEL_BASE_URL);
export const register = ({ name, email, pass }) => async (dispatch) => {
    const config = {
        headers: {
            'authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ name, email, pass });

    try {
        const res = await axios.post(`${LARAVEL_SERVER}/RegisterUser`, body, config);

        localStorage.setItem('token', res.data.token);

        dispatch({
            type: REGISTER_DONE,
            payload: {
                token: res.data.token,
                user: res.data.user
            }
        });

        dispatch({
            type: GET_TODOS,
            payload: res.data.user.user_todos
        });

    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: error.response.data
        });
    }
};

export const login = ({ email, pass }) => async (dispatch) => {
    const config = {
        headers: {
            'authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ email, pass });

    try {
        const res = await axios.post(`${LARAVEL_SERVER}/LoginUser`, body, config);

        localStorage.setItem('token', res.data.token);

        dispatch({
            type: LOGIN_DONE,
            payload: {
                token: res.data.token,
                user: res.data.user
            }
        });

        dispatch({
            type: GET_TODOS,
            payload: res.data.user.user_todos
        });

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data
        });
    }
};

export const logout = () => async (dispatch) => {
    localStorage.removeItem('token');
    dispatch({
        type: LOGOUT_DONE
    });
};
export const updateUserInfo = (user) => async (dispatch)=> {
    try {
        const res = await axios.put(`${LARAVEL_SERVER}/updateUserInfo`, user);
    
        dispatch({
          type: UPDATE_USER_INFO,
          payload: res.data,
        });
      } catch (error) {
        console.error('Failed to update user info:', error);
    
      }
}