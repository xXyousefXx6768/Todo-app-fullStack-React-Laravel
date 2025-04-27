import { 
    REGISTER_DONE,
    LOGIN_DONE,
    REGISTER_FAIL,
    LOGIN_FAIL,
    LOGOUT_DONE,
    UPDATE_USER_INFO
} from "../types/actiontypes";
import { toast, Bounce } from "react-toastify";

import { ADD_TODO, GET_TODOS } from "../types/actiontypes";
import axios from "axios";



const LARAVEL_SERVER = import.meta.env.VITE_LARAVEL_BASE_URL;



export const RegisterUser = ({ name, email, password }) => async (dispatch) => {
    try {

        console.log("📍 Getting CSRF token...");
        await axios.get(`${LARAVEL_SERVER}/sanctum/csrf-cookie`, {
            withCredentials: true
        });
        console.log("✅ CSRF token:" );
        console.log("📍 Registering user...");
        
        const res = await axios.post(
            `${LARAVEL_SERVER}/api/register`,
            { name, email, password },
            { withCredentials: true }
          );
          
          console.log("✅ Register response:", res.data);
          
          dispatch({
            type: REGISTER_DONE,
            payload: {
                user: res.data.user,
            },
        });

        dispatch({ type: GET_TODOS, payload: res.data.user_todos });
         toast.success(res.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
            });


    } catch (error) {
        console.log("❌ Register error:", error.response?.data || error.message);
        const errorMessage =
        error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : "An unexpected error occurred";
        dispatch({
            type: REGISTER_FAIL,
            payload:  error.response?.data  || { message: error.message },
        });
        toast.error(error.response.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        })
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
        toast.success(res.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
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
export const loadUserInfo = () => async (dispatch) => {
    try {
        const res = await axios.get(`${LARAVEL_SERVER}/user`, {
            withCredentials: true
        });
        dispatch({
            type: LOGIN_DONE,
            payload: {
                user: res.data.user
            }
        });
        dispatch({
            type: GET_TODOS,
            payload: res.data.user.user_todos
        });
    } catch (error) {
        console.error(error);
    }
}
export const logout = () => async (dispatch) => {
    localStorage.removeItem("token");

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
        toast.success(res.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
            });
      } catch (error) {
        console.error('Failed to update user info:', error);
    
      }
}