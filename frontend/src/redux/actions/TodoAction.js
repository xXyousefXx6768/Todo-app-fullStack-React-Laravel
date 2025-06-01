import axios from "axios";
import {
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  GET_TODOS,
  ADD_TODO_FAIL,
  GET_TODOS_FAIL,
  SET_FAV_TODO,
  SET_FAV_TODO_FAIL,
  GET_FAV_TODOS,
  GET_FAV_TODOS_FAIL

} from "../types/actiontypes";
import { toast, Bounce } from "react-toastify";
import { useSelector } from "react-redux";

const LARAVEL_SERVER = import.meta.env.VITE_LARAVEL_BASE_URL;

///////////////add todo////////////////

export const addTodo = (todoData) => async (dispatch) => {
  try {
    
    console.log("📍 Getting CSRF token...");
    await axios.get(`${LARAVEL_SERVER}/sanctum/csrf-cookie`, {
      withCredentials: true
  });

   //////////////requestData////////////////////
    
    const res = await axios.post(
      `${LARAVEL_SERVER}/api/CreateTodo`, 
      todoData,
      {withCredentials: true}

    );
    console.log("✅ todo info:", res.data); 
    dispatch({
      type: ADD_TODO,
      payload:  res.data.todo
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
      console.log(errorMessage);
      console.log("📦 Request sent:", error.response.data.request)
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
export const updateTodo = (todoData) => async (dispatch) => {
  try {
    const { id, ...data } = todoData;
    console.log('id', id);
    console.log("Sending data to backend:", data);
    const res = await axios.put(`${LARAVEL_SERVER}/api/updateTodo/${id}`, data);
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

export const SetFavTodo = (todo) => async (dispatch, getState) => {
  try {
    const favs = getState().todo.favTodos || [];

    // ✅ استخدم id بدل _id
    const isFav = favs.find((fav) => fav.id === todo.id);

    let updatedFavs;

    if (isFav) {
      updatedFavs = favs.filter((fav) => fav.id !== todo.id);
      toast.success('Todo removed from favorites', {
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
    } else {
      updatedFavs = [...favs, todo];
      toast.success('Todo marked as favorite', {
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

    localStorage.setItem('favTodos', JSON.stringify(updatedFavs));

    dispatch({
      type: SET_FAV_TODO,
      payload: updatedFavs
    });

  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;

    dispatch({ type: GET_TODOS_FAIL });

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
