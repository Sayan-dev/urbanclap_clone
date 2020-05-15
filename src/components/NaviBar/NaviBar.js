import React, { Fragment } from 'react';
import "./NaviBar.css"
import {Navbar,Nav} from "react-bootstrap"
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';


const NaviBar = (props) => {
    const {workers,auth,users}=props
    return (
        <Fragment >
            <Navbar bg="light" expand="lg" className="navibar" sticky={"top"} >
                <Nav>
                <Navbar.Brand className="nav_brand" >modern Company</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" style={{zIndex:"0"}} />

                </Nav>
            
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="links ml-auto">
                <Link to="/">Home</Link>
                {
                    props.logout?
                <SignedOutLinks/>:
                <SignedInLinks profile={workers &&  workers[auth.uid]?workers[auth.uid]:users[auth.uid]}/>


                }
                </Nav>
                
            </Navbar.Collapse>
            </Navbar>
        </Fragment>
    );
};


const mapStateToProps=state=>{
    return{
        logout:state.firebase.auth.isEmpty,
        auth:state.firebase.auth,
        workers:state.firestore.data.workers,
        users:state.firestore.data.users,

    }
}

export default compose(firestoreConnect([{collection:'users'},{collection:"workers"}]),connect(mapStateToProps))(NaviBar)
