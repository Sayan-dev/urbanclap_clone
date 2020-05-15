import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './store/reducers/rootReducer'
import { Provider, useSelector } from 'react-redux'
import thunk from 'redux-thunk'

import { reduxFirestore, createFirestoreInstance, getFirestore }
  from 'redux-firestore'


import { ReactReduxFirebaseProvider, getFirebase, isLoaded }
  from 'react-redux-firebase'


import firebase, { fbConfig } from './config/fbconfig'





const db = firebase.firestore();



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
      applyMiddleware(
        thunk.withExtraArgument({ getFirebase, getFirestore })
      ),


      reduxFirestore(firebase, fbConfig)
    )
  )




  const rrfConfig = {
    userProfile: "users",
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  }

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
}



function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <div>Loading Screen...</div>;
      return children
}




ReactDOM.render(
<Provider store={store}> 
<ReactReduxFirebaseProvider {...rrfProps}>
   <AuthIsLoaded>
     <App /> 
     </AuthIsLoaded>
     </ReactReduxFirebaseProvider>
     </Provider>, document.getElementById('root')
     );


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

