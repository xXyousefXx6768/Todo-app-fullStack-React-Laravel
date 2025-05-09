import { ADD_TODO, REMOVE_TODO, UPDATE_TODO, GET_TODOS } from "../types/actiontypes";

const initialState = {
    todos: [],
    pendingTodos : [],
    completedTodos : []

};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_TODOS:
            return {
                ...state,
                todos: action.payload,
                pendingTodos : action.payload.filter(todo => todo.status === 'pending'),
                completedTodos : action.payload.filter(todo => todo.status === 'completed'),
            };
        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, action.payload]
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
        default:
            return state;
    }
}
