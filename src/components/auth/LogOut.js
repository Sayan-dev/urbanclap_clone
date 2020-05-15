import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import * as actions from "../../store/actions/index";


class LogOut extends Component {
    componentDidMount(){
        this.props.logOut();
    }

    render() {
        const logout=(
            this.props.logout?<Redirect to='/'/>:"Logout..."
        )
        
        return (
            <React.Fragment>
            {logout}

            </React.Fragment>
        );
    }
}

const mapStateToProps=state=>{
  return{
    logout:state.firebase.auth.isEmpty
  }
}

const mapDispatchToProps=dispatch=>{
    return{
        logOut:()=>{dispatch(actions.logOut())}
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(LogOut)