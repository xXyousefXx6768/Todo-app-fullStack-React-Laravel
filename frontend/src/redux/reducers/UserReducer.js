import { 
    REGISTER_DONE,
    REGISTER_FAIL,
    LOGIN_DONE,
    LOGIN_FAIL,
    LOGOUT_DONE,
    UPDATE_USER_INFO
} from "../types/actiontypes";

const initialState={
    user: null,
    isAuthenticated: false,
    loading: false,
}

export default function  (state=initialState,action){
     const {type, payload}=action
     switch (type) {
        case  REGISTER_DONE:
           return{
             ...state,
             user: payload.user,
             isAuthenticated: true,
             loading: false,
           }
           case REGISTER_FAIL:
            return{
                ...state,
                user: null,
                isAuthenticated: false,
                loading: false,

            }
            case LOGIN_DONE:
                localStorage.setItem('token',payload.token)
               return{
                 ...state,
                 ...payload,
                 isAuthenticated:true,
                 loading:false
               }
               case LOGIN_FAIL:
                localStorage.removeItem('token')
                return{
                    ...state,
                    token:null,
                    isAuthenticated:false,
                    loading:false

                }

                case LOGOUT_DONE:
                localStorage.removeItem('token')
                return{
                    ...state,
                    user:null,
                    token:null,
                    isAuthenticated:false,
                    loading:false

                }
                case UPDATE_USER_INFO:
                    return{
                        ...state,
                        user:payload
                    }
                default:
                    return state
     
      
     }
}