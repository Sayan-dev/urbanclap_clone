import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";

import authReducer from "./authReducer";
import serviceReducer from "./serviceReducer";
import { firebaseReducer } from "react-redux-firebase";



const rootReducer=combineReducers({
    auth:authReducer,
    service:serviceReducer,
    firestore:firestoreReducer,
    firebase:firebaseReducer
});

export default rootReducer;