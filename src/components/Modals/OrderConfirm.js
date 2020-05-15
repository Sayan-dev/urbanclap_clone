import React, { Component, Fragment } from 'react';
import { Modal, Container, Row, Col, Button } from 'react-bootstrap';

import TimeAndDate from './confirmation/TimeAndDate';
import Payment from './confirmation/Payment';
import Location from './confirmation/Location';
import {connect} from 'react-redux';
import * as actions from "../../store/actions/index";

import Success from './confirmation/Success';
import { withRouter } from 'react-router';

class OrderConfirm extends Component {
  state={
    step: 1,
    contact:"",
    address:"",
    coordinates:{
      lat: 22.505252,
      lng: 88.321412
  },
    startDate: "",
    time: '',
    success:false

  }
  handleSuccess=()=>{
    console.log("SucessFull")
    this.setState({success:true});
    setTimeout(()=>{
      this.props.history.push("/");
    },5000)
    const details={
      name:this.props.name,
      orders:this.props.orders,
      address:this.state.address,
      usrId:this.props.usrId,
      city:this.props.city,
      startDate:this.state.startDate,
      coords:this.state.coordinates,
      time:this.state.time,
      total:this.props.total

    }
    
    this.props.orderSuccess(details);
    

  }
  handleDate = e=> {
    console.log(e.target.parentElement.parentElement.id)
    this.setState({
      startDate: e.target.parentElement.parentElement.id
    });
  };
  onChange = e =>{
    console.log(e.target.id);
    this.setState({ time:e.target.id })
  } 
  nextStep = () => {
    const { step } = this.state
    this.setState({
        step : step + 1
    })
  }

  prevStep = () => {
      const { step } = this.state
      this.setState({
          step : step - 1
      })
  }

  handleChange = input => event => {
      this.setState({ [input] : event.target.value })
  }
  handleLocation=()=>{
    navigator.geolocation.getCurrentPosition(pos=>{
        let lat=pos.coords.latitude,lng=pos.coords.longitude,coords=lat+", "+lng;

        
        return(this.setState({coordinates:{
            lat,
            lng
        }}))
    })
}
setAddress=(val)=>{
  this.setState({address:val});

}
setCoordinates=(coord)=>{
  this.setState({coordinates:coord})
}
  render() {
    
    const { step,contact,address,startDate,time } = this.state;
    const values = { contact,address,startDate,time };
    let body;
    switch(step) {
      case 1:
        body=<Location
                  setAddress={this.setAddress}
                  setCoordinates={this.setCoordinates}
                  handleLocation={this.handleLocation}
                  coordinates={this.state.coordinates}
                  nextStep={this.nextStep}
                  handleChange = {this.handleChange}
                  values={values}
                  />
                  break;
          
      case 2:
        body= <TimeAndDate
        handleDate={this.handleDate}
        onChange={this.onChange}
        time={this.state.time}
        startDate={this.state.startDate}
        nextStep={this.nextStep}
        handleChange = {this.handleChange}
        values={values}
        />
        break;
      case 3:
          body= <Payment
                  paysuccess={this.props.success}
                  success={this.handleSuccess}
                  total={this.props.total}
                  nextStep={this.nextStep}
                  prevStep={this.prevStep}
                  values={values}
                  />
                  break;
      default:
          body= <h3>A problem occured</h3>
          break;
      }

      if(this.state.success){
        
        body=<h1>Success</h1>
      }
    return (
      <Fragment>
      <Modal  size="lg" {...this.props} aria-labelledby="contained-modal-title-vcenter" centered>
    <Modal.Header >
      <h4 style={{textAlign:"center"}}>Checkout Details</h4>
    </Modal.Header>
    <Modal.Body style={{height:"400px"}}>
      {
        
          body
        
      }
      

    </Modal.Body>
    
  </Modal>
      
        </Fragment>
      
    )}
}

const mapStateToProps=state=>{
  return{
    success:state.service.success
  }
}

const mapDispatchToProps=dispatch=>{
  return{
    orderSuccess:(data)=>{dispatch(actions.orderSuccess(data))}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(OrderConfirm));