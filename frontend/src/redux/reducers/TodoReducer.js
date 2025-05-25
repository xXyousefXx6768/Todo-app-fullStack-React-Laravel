import { ADD_TODO, REMOVE_TODO, UPDATE_TODO, GET_TODOS, SET_FAV_TODO, GET_FAV_TODOS } from "../types/actiontypes";

const initialState = {
    todos: [],
    pendingTodos : [],
    completedTodos : [],
    favTodos: JSON.parse(localStorage.getItem('favTodos')) || [],

};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_TODOS:
            return {
                ...state,
                todos: action.payload,
                pendingTodos : action.payload.filter(todo => todo.status == 0),
                completedTodos : action.payload.filter(todo => todo.status == 1),
            };
        case ADD_TODO:
            const newTodo = action.payload;
            return {
                ...state,
                todos: [...state.todos,newTodo]
            };
        case REMOVE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload)
            };
        case UPDATE_TODO:
            return {
                ...state,
                todos: state.todos.map(todo => todo.id === action.payload.id ? action.payload : todo)
            };
            case SET_FAV_TODO:
            return {
                ...state,
                favTodos: action.payload
            }
        default:
            return state;
    }
}
