import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

const SignedInLinks = (props) => {
    const {users,userId,profile}=props;
    const create=(users?((users[userId]?users[userId].isAdmin:false)?
        <Link to="/create">Create</Link>
        :null
        
        ):null)
    console.log(profile);
    // const create=userId
    return (
        <React.Fragment>
            {create}
            <Link to="/logout">Logout</Link>
            <Link to="/">{props.profile.initials}</Link>

        </React.Fragment>

            
    );
};

const mapStateToProps=state=>{
    return{
        users:state.firestore.data.users,
        userId:state.firebase.auth.uid,
    }
}

export default compose(firestoreConnect([{collection:'users'},{collection:"workers"}]),connect(mapStateToProps))(SignedInLinks)
