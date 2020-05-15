import * as actiontypes from '../actions/actionTypes';

const initialstate={

    authError:null,
    logout:false
}


const authReducer=(state=initialstate,action)=>{
    switch(action.type){
        case actiontypes.VERIFY_EMAIL:
            alert("Please verify your email id");
        case actiontypes.LOGIN_SUCCESS:
            console.log("Success")

            return{
                ...state,
                authError:null,
                logout:false
            }
            
        case actiontypes.LOGIN_FAIL:
            console.log("Error",action.err)
            return{
                ...state,
                authError:"Login failed"
            }
        case actiontypes.LOGOUT:
            console.log("Logout Success");
            return {
                ...state,
                logout:true,
            };
        case actiontypes.CREATE_USER:
            console.log(action.response);
            break;
        case actiontypes.CREATE_USER_SUCCESS:
                console.log("Signup success");
                return{
                    ...state,
                    authError:null
                }
        case actiontypes.CREATE_USER_ERROR:
            console.log("Login Fail",action.err);
            return{
                ...state,
                authError:action.err.message
            }
            
        default:
            return state;
    }
}

export default authReducer;