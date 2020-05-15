
import React, { Component } from 'react';

import * as actions from "../store/actions/index.js";
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import ServiceList from '../components/ServiceLIst/ServiceList.js';
import TypeEdit from '../components/EditService/TypeEdit.js';

class CreateService extends Component {
  state = {

    type:{
      0:{
        name:"",
        subtype:{
          0:{
            name:"",
            price:0,
            time:0,
            why_safe:"",
            whats_included:"",
            recommend:"",
            brands:"",
    }
          }
        },
      
      },

    }
    
  

  handleChange = (e) => {
    let newId=e.target.id.split('.');
    console.log(newId);
    const newState={...this.state}
    // for(var i=0; i < str.length; i++)
    // values = values[str[i]];
    if(newId[1]){if(newState[newId[0]][parseInt(newId[1])][newId[2]][parseInt(newId[3])]){
      newState[newId[0]][parseInt(newId[1])][newId[2]][parseInt(newId[3])][newId[4]]=e.target.value
    }else if(newState[newId[0]][parseInt(newId[1])]){
      newState[newId[0]][parseInt(newId[1])][newId[2]]=e.target.value
    }else{
      newState[newId[0]]=e.target.value
    }}
    else{
      newState[newId[0]]=e.target.value
    }
 

    console.log(newState);


    
    this.setState({
      ...newState
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    // const newState={...this.state}
    // const newProj=newState.forEach(ele=>{
    //   return[ele.title,ele.content];
    // });
    this.props.serveUpdate(this.state,this.props.doc);
    //console.log(this.state);
  }
  deleteHandler=(e)=>{
    e.preventDefault();
    console.log(e.target.parentElement.parentElement.getAttribute("id"));
    const id=e.target.parentElement.parentElement.getAttribute("id");
    this.props.serveDelete(id);

  }
  addTypeHandler=()=>{
    const len=Object.keys(this.state.type).length
    const newState={...this.state}
    newState.type[len]={
      name:"",
      subtype:{
        0:{
          name:"",
          price:0,
          time:0,
          why_safe:"",
          whats_included:"",
          recommend:"",
          brands:"",
    }
  }
}
  this.setState({...newState})   
  
  }
  addSubTypeHandler=(key)=>{
    const len=Object.keys(this.state.type[key].subtype).length
    const newState={...this.state}
    newState.type[key].subtype[len]={
      
          name:"",
          price:0,
          time:0,
          why_safe:"",
          whats_included:"",
          recommend:"",
          brands:"",
    
  
}   
  this.setState({...newState})
  
  }
  render() {
    const {service,doc}=this.props
    console.log(this.state)
    // const serviceList=(
    //   services?<ServiceList list={services} clicked={this.deleteHandler}/>:"loading..."
    // )
      
    return (
      <React.Fragment>
        <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Edit Service</h5>
          <div className="input-field">
            <input type="text" id='name' onChange={this.handleChange} value={!this.state.name?(service && service.name):this.state.name}/>
            <label htmlFor="name">Service name</label>
          </div>
          <div className="input-field">
            <textarea id="tag" className="materialize-textarea" onChange={this.handleChange} value={!this.state.tag?(service && service.tag):this.state.tag}></textarea>
            <label htmlFor="tag">Service Tag</label>
          </div>
          <TypeEdit service={service} types={this.state.type} change={this.handleChange} add={this.addTypeHandler} addSub={(key)=>this.addSubTypeHandler(key)}/>
          
          <div className="input-field">
            <button className="btn pink lighten-1">Edit <i class="material-icons right">send</i></button>
          </div>
        </form>
      </div>
 

      </React.Fragment>
      
    )
  }
}

const mapStateToProps=(state,ownProps)=>{
    const id = ownProps.match && ownProps.match.params.id;
    console.log("ID dekho 2",id);
    const services=state.firestore.data.services
    const service=services?services[id]:null
    console.log(service)
    return{
      service:service,
      doc:id
  
  
    }
  }

const mapDispatchToProps=(dispatch)=>{
  return{
    serveCreate:(service)=>{dispatch(actions.createService(service))},
    serveDelete:(service)=>{dispatch(actions.deleteService(service))},
    serveUpdate:(service,doc)=>{dispatch(actions.updateService(service,doc))},
  }
}
export default compose(firestoreConnect(['services']),connect(mapStateToProps,mapDispatchToProps))(CreateService)
