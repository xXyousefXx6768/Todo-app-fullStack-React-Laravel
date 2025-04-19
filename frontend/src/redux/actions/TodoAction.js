import axios from "axios";
import {
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  GET_TODOS
} from "../types/actiontypes";

// Add Todo
export const addTodo = (todo) => async (dispatch) => {
  try {
    const Token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`
      }
    };
    const res = await axios.post(`${import.meta.env.VITE_LARAVEL_BASE_URL}/addTodo`, todo, config);
    dispatch({
      type: ADD_TODO,
      payload: res.data
    });
  } catch (error) {
    console.error(error);
  }
};

// Remove Todo
export const removeTodo = (id) => async (dispatch) => {
  try {
    const Token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`
      }
    };
    await axios.delete(`${import.meta.env.VITE_LARAVEL_BASE_URL}/removeTodo/${id}`, config);
    dispatch({
      type: REMOVE_TODO,
      payload: id
    });
  } catch (error) {
    console.error(error);
  }
};

// Update Todo
export const updateTodo = (todo) => async (dispatch) => {
  try {
    const Token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`
      }
    };
    const res = await axios.put(`${import.meta.env.VITE_LARAVEL_BASE_URL}/updateTodo`, todo, config);
    dispatch({
      type: UPDATE_TODO,
      payload: res.data
    });
  } catch (error) {
    console.error(error);
  }
};
