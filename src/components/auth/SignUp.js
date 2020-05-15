import React, { Component } from 'react'
import * as actions from "../../store/actions/index";
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Container, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import SignUpWorker from './SignUpWorker';
import SignUpUsr from './SignUpUsr';


class SignUp extends Component {
  state = {
    options : [
      // ...
      { value: "worker", label: 'Service Worker' },
      { value: 'user', label: 'User' },
      // ...
  ],
    detail:""
  }
  selectHandler=(e)=>{
    this.setState({
      detail:e.value
    })
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    this.props.signUpHandler(this.state)
  }
  render() {
    const {options}=this.state; 

    const {authError,logout}=this.props
    const log=logout?null:<Redirect to="/"/>;
    let view=(
      <Container fluid className="home_container">
        {log}
                <Row xs={1}>
                    <Col xs={12} sm={2} md={3}></Col>
                    <Col className="home_col" xs={12} sm={8} md={6}>

                            <h1>Are you a worker or a user</h1>
                            <p>
                            <Select
                                name="details"
                                value="one"
                                options={options}
                                placeholder={"Worker or User"}
                                defaultValue={this.state.detail}
                                onChange={val =>this.selectHandler(val)}
                            />
                            </p>
                            

                      
                        
                        
                    </Col>
                    <Col xs={12} sm={2} md={3}></Col>
                </Row>

            </Container>
    );
    if(this.state.detail==="worker"){
      view=<SignUpWorker/>

    }else if(this.state.detail==="user"){
      view=<SignUpUsr/>
    }
    return (
      <React.Fragment>
      {view}

      </React.Fragment>

    )
  }
}

const mapStateToProps=state=>{
  return{
    authError:state.auth.authError,
    logout:state.firebase.auth.isEmpty

  }
}

const mapDispatchToProps=dispatch=>{
  return {
    signUpHandler:(data)=>{dispatch(actions.createUsr(data))}
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SignUp)

