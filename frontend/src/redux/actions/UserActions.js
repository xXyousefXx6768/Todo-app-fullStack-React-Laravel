import { 
    REGISTER_DONE,
    LOGIN_DONE,
    REGISTER_FAIL,
    LOGIN_FAIL,
    LOGOUT_DONE,
    UPDATE_USER_INFO,
    UPDATE_USER_FAIL,
    SESSION_EXPIRED
} from "../types/actiontypes";
import { toast, Bounce } from "react-toastify";

import { ADD_TODO, GET_TODOS } from "../types/actiontypes";
import axios from "axios";



const LARAVEL_SERVER = import.meta.env.VITE_LARAVEL_BASE_URL;


function hasXsrfCookie() {
    return document.cookie.includes('XSRF-TOKEN=');
}

 export function clearAllCookies() {
    document.cookie.split(";").forEach(cookie => {
        const name = cookie.split("=")[0].trim();
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });
}

function getCookieValue(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
}

export const RegisterUser = ({ name, email, password }) => async (dispatch) => {
    try {

        console.log("📍 Getting CSRF token...");
        if (!hasXsrfCookie()) {
            await axios.get(`${LARAVEL_SERVER}/sanctum/csrf-cookie`, {
                withCredentials: true
            });
        }
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
        toast.error(errorMessage, {
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

export const login = ({ email, password }) => async (dispatch) => {
   
   

    try {
         console.log("📍 Getting CSRF token...");
         if (!hasXsrfCookie()) {
            await axios.get(`${LARAVEL_SERVER}/sanctum/csrf-cookie`, {
                withCredentials: true
            });
        }
         console.log("✅ CSRF token:");
        const res = await axios.post(
            ` ${LARAVEL_SERVER}/api/login`
            , { email, password },
             { withCredentials: true });

        console.log("✅ Login response:", res.data);

        dispatch({
            type: LOGIN_DONE,
            payload: {
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



    } catch (error) {
        console.log('📍 Login error:', error.response?.data || error.message);
        const errorMessage =
        error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : "An unexpected error occurred";
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data
        });
        toast.error(errorMessage, {
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
export const loadUserInfo = () => async (dispatch) => {
    try {
         
        if (!hasXsrfCookie()) {
            await axios.get(`${LARAVEL_SERVER}/sanctum/csrf-cookie`, {
                withCredentials: true
            });
        }


        const res = await axios.get(`${LARAVEL_SERVER}/api/user`, {
            withCredentials: true,
        });
        dispatch({
            type: LOGIN_DONE,
            payload: {
                user: res.data.user
            }
        });
        dispatch({
            type: GET_TODOS,
            payload: res.data.user_todos
        });
         console.log("✅ User info:", res.data);
         console.log("✅ User todos:", res.data.user_todos);
    } catch (error) {
        if (error.response?.status === 401) {
            console.warn("❌ Session expired: No user data.");
            toast.error("Session expired: No user data.", {
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
            dispatch({
                type: SESSION_EXPIRED
            })
            clearAllCookies()
            console.log('session expired done')
        }
        console.error(error);   
        

    }
}



export const logout = () => async (dispatch) => {
    try {
       
        console.log("✅ CSRF token:");
        const xsrfToken = getCookieValue("XSRF-TOKEN");
          
       const res= await axios.post(`${LARAVEL_SERVER}/api/logout`,null, {
            withCredentials: true,
            headers: {
                "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            }
        });
        console.log("✅ Logout response:", res.data);
        dispatch({
            type: LOGOUT_DONE
        });
        clearAllCookies();
        
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
        dispatch({
            type: LOGIN_FAIL
        })
        const errorMessage = error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : "An unexpected error occurred";

        console.log("📍 Logout error:", error.response?.data || error.message);
        toast.error(errorMessage, {
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
export const updateUserInfo = (user) => async (dispatch) => {
    try {
      await axios.get(`${LARAVEL_SERVER}/sanctum/csrf-cookie`, {
        withCredentials: true,
      });
  
      const { id, ...data } = user;
     console.log(id + 'id')
      const formData = new FormData();
      formData.append("name", data.name);
  
      if (data.profile_img_url instanceof File) {
        formData.append("profile_img_url", data.profile_img_url);
        console.log(data.profile_image_url);
      }
      

  
      const res = await axios.post(
        `${LARAVEL_SERVER}/api/updateUser/${id}?_method=PUT`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
  
      dispatch({
        type: UPDATE_USER_INFO,
        payload: res.data.user,
      });
  
      console.log("✅ Update user info:", res.data);
      console.log(res.data.user.profile_img_url+'profile_img_url');

      toast.success(res.data.message);
    } catch (error) {
      dispatch({ type: UPDATE_USER_FAIL });
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    }
  };