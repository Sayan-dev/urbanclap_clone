import React, { Fragment } from 'react';
import './App.css';
import {Switch, BrowserRouter, Route} from "react-router-dom"

import Layout from "./hoc/Layout/Layout"
import Home from './pages/Home';
import NaviBar from './components/NaviBar/NaviBar';
import CreateService from './pages/CreateService';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import ServiceDetails from './pages/ServiceDetails';
import LogOut from './components/auth/LogOut';
import ServiceEdit from './pages/ServiceEdit';
import ServiceBilling from './pages/ServiceBilling';
import PlaceOrder from './pages/PlaceOrder';
import {StripeProvider} from 'react-stripe-elements';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import * as actions from "./store/actions/index";

import { Button } from 'react-bootstrap';
import Layout2 from './hoc/Layout/Layout2';
import Assigned from './components/workerProfile/Assigned';
import Pending from './components/workerProfile/Pending';
import Done from './components/workerProfile/Done';



const App=(props)=> {
  const {workers,auth}=props;
  let app;
if(workers){
  if(!workers[auth.uid]){
    if(!props.logout){
      if(props.auth.emailVerified){

        app=(
          <StripeProvider apiKey="pk_test_JJ1eMdKN0Hp4UFJ6kWXWO4ix00jtXzq5XG">
          <Layout>
          <Switch>
            <Route exact path='/'component={Home} />
            <Route path='/service/:id' component={ServiceDetails} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/logout' component={LogOut} />
            <Route path='/create' component={CreateService} />
            <Route path='/service-add/:id' component={ServiceEdit} />
            <Route path='/serviceBilling/:id' component={ServiceBilling} />
            <Route path='/place-order' component={PlaceOrder} />
          </Switch>
          </Layout>
          </StripeProvider>
        )
      }else{
        app=(
          <Fragment>
            <h3>Please verify your account and refresh page.....</h3>
            <Button onClick={props.logOut}>Logout</Button>
          </Fragment>
        )

      }

    }else{
      app=(
        <StripeProvider apiKey="pk_test_JJ1eMdKN0Hp4UFJ6kWXWO4ix00jtXzq5XG">
        <Layout>
        <Switch>
          <Route exact path='/'component={Home} />
          <Route path='/service/:id' component={ServiceDetails} />
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          <Route path='/logout' component={LogOut} />
          <Route path='/create' component={CreateService} />
          <Route path='/service-add/:id' component={ServiceEdit} />
          <Route path='/serviceBilling/:id' component={ServiceBilling} />
          <Route path='/place-order' component={PlaceOrder} />
        </Switch>
        </Layout>
        </StripeProvider>
      )
    }

  }
  else{
    app=(
    <Switch>
      <Layout>
      <Route exact path='/'component={Home} />
      <Route path='/signin' component={SignIn} />
      <Route path='/signup' component={SignUp} />
      <Route path='/logout' component={LogOut} />
      <Layout2>
      <Route exact path='/worker/assigned'component={Assigned} />
      <Route exact path='/worker/pending'component={Pending} />
      <Route exact path='/worker/done'component={Done} />
      
        
      </Layout2>
    </Layout>

    </Switch>
    
      
    )
  }
}

  
  return (
    <BrowserRouter>
        <div className="App">
          {app}
          
          
        </div>
      </BrowserRouter>
  );
}
const mapStateToProps=state=>{
  return{
      logout:state.firebase.auth.isEmpty,
      auth:state.firebase.auth,
      workers:state.firestore.data.workers

  }
}
const mapDispatchToProps=dispatch=>{
return{
    logOut:()=>{dispatch(actions.logOut())}
}
}

export default compose(firestoreConnect([{collection:'users'},{collection:"workers"}]),connect(mapStateToProps,mapDispatchToProps))(App)

