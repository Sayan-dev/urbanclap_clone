import React, { Component } from 'react';

import * as actions from "../store/actions/index.js";
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import ServiceList from '../components/ServiceLIst/ServiceList.js';

class CreateService extends Component {
  state = {
    tag: '',
    name: '',
    cities:''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    // const newState={...this.state}
    // const newProj=newState.forEach(ele=>{
    //   return[ele.title,ele.content];
    // });
    const newServe={
      name:this.state.name,
      tag:this.state.tag
    }
    this.props.serveCreate(newServe);
    //console.log(this.state);
    this.props.addService(this.state);
  }
  deleteHandler=(e)=>{
    e.preventDefault();
    console.log(e.target.parentElement.parentElement.getAttribute("id"));
    const id=e.target.parentElement.parentElement.getAttribute("id");
    this.props.serveDelete(id);

  }
  render() {
    const {services}=this.props
    const serviceList=(
      services?<ServiceList list={services} clicked={this.deleteHandler}/>:"loading..."
    )
      
    return (
      <React.Fragment>
        <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Create a New service</h5>
          <div className="input-field">
            <input type="text" id='name' onChange={this.handleChange} />
            <label htmlFor="name">Service name</label>
          </div>
          <div className="input-field">
            {/* <textarea id="tag" className="materialize-textarea" onChange={this.handleChange}></textarea> */}
            <input type="text" id='tag' onChange={this.handleChange} />
            <label htmlFor="tag">Service Tag</label>
          </div>
          <div className="input-field">
            {/* <textarea id="tag" className="materialize-textarea" onChange={this.handleChange}></textarea> */}
            <input type="text" id='cities' onChange={this.handleChange} />
            <label htmlFor="cities">Service Available on Cities</label>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1">Create <i class="material-icons right">send</i></button>
          </div>
        </form>
      </div>
      <Container>
        <h3>
          Services       
        </h3>
        {serviceList}
        
        

      </Container>

      </React.Fragment>
      
    )
  }
}

const mapStateToProps=state=>{
  console.log(state)
  return{
    services:state.firestore.data.services

  }
}


const mapDispatchToProps=(dispatch)=>{
  return{
    serveCreate:(service)=>{dispatch(actions.createService(service))},
    addService:(service)=>{dispatch(actions.addService(service))},
    serveDelete:(service)=>{dispatch(actions.deleteService(service))}
  }
}
export default compose(firestoreConnect(['services']),connect(mapStateToProps,mapDispatchToProps))(CreateService)
