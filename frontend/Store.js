import { createStore,combineReducers,applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; 

import  UserReducer  from "./src/redux/reducers/UserReducer";
import TodoReducer from "./src/redux/reducers/TodoReducer";
import  DarkModeReducer  from "./src/redux/reducers/DarkModeReducer";
import ModalReducer from "./src/redux/reducers/ModalReducer";

const rootReducers= combineReducers({
    user:UserReducer,
    todo:TodoReducer,
    theme:DarkModeReducer,
    Modal:ModalReducer

});
const store= createStore(rootReducers,applyMiddleware(thunk));
export default store