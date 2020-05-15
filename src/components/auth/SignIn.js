import React, { Component } from 'react'
import * as actions from "../../store/actions/index";
import { connect } from 'react-redux';
import { Redirect } from 'react-router';


class SignIn extends Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    this.props.signInHandler(this.state);
  }
  render() {
    const {authError,logout}=this.props
    const log=this.props.logout?null:this.props.orders?<Redirect to="/"/>:<Redirect to="/"/>;

    return (
      
      <div className="container">
          {log}
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Sign In</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id='email' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id='password' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Login</button>
            <div className="red-text center">
                <p>{authError}</p>
            </div>
          </div>

        </form>

      </div>
    )
  }
}

const mapStateToProps=state=>{
  return{
    authError:state.auth.authError,
    logout:state.firebase.auth.isEmpty,
    orders:state.service.orders
  }
}

const mapDispatchToProps=dispatch=>{
    return {
      signInHandler:(data)=>{dispatch(actions.logIn(data))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SignIn)
