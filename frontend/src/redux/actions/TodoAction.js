import axios from "axios";
import {
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  GET_TODOS,
  ADD_TODO_FAIL,
  GET_TODOS_FAIL,

} from "../types/actiontypes";
import { toast, Bounce } from "react-toastify";


const LARAVEL_SERVER = import.meta.env.VITE_LARAVEL_BASE_URL;

///////////////add todo////////////////

export const addTodo = (...todoData) => async (dispatch) => {
  try {
    

   //////////////requestData////////////////////
    const todo = { ...todoData };
    const res = await axios.post(
      `${LARAVEL_SERVER}/addTodo`, 
      todo ,
      {withCredentials: true}

    );
    dispatch({
      type: ADD_TODO,
      payload: res.data
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
    const errorMessage = 
    error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch({
      type: ADD_TODO_FAIL
    })
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
    });
  }
};

//////////////// Remove Todo///////////////////
export const removeTodo = (id) => async (dispatch) => {
  try {
     /////////////requestTodoId////////////////////
   const res = await axios.delete(
      `${LARAVEL_SERVER}/api/removeTodo/${id}`,
      {withCredentials: true}
        
     );
    dispatch({
      type: REMOVE_TODO,
      payload: id
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
    })
  } catch (error) {
     const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch({
      type: GET_TODOS_FAIL
    })
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
    });
  }
};

// Update Todo
export const updateTodo = (...todoData) => async (dispatch) => {
  try {
   
    const res = await axios.put(`${LARAVEL_SERVER}/api/updateTodo`, ...todoData);
    dispatch({
      type: UPDATE_TODO,
      payload: res.data.todo
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
    })
  } catch (error) {
     const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch({
      type: GET_TODOS_FAIL
    })
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
    });
  }
};
