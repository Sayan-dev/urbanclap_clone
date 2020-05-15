import React, { Fragment } from 'react';
import NaviBar from '../../components/NaviBar/NaviBar';
import "./Layout.css"
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import * as actions from "../../store/actions/index";

import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';


const Layout = (props) => {
  const {workers,auth}=props;
  let app=(
    <React.Fragment>
        <NaviBar  className="layout_head"/>
        
        <div className="layout">
        {props.children}
        </div>
       


    </React.Fragment>
)


  
  
      console.log(props.workers)
    return (
        <Fragment>
            {app}
        </Fragment>
        
        
    );
};
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
export default compose(firestoreConnect([{collection:'users'},{collection:"workers"}]),connect(mapStateToProps,mapDispatchToProps))(Layout)
