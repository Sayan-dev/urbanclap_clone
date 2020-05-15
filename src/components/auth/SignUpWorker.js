import React, { Component } from 'react'
import * as actions from "../../store/actions/index";
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Select from 'react-select';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
  } from "react-places-autocomplete";
import { Button } from 'react-bootstrap';

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    worker:true,
    coordinates:{
      lat: 22.572133,  
      lng: 88.487970,
  },
  }
  setAddress=(val)=>{
    this.setState({address:val});

}
handleSelect = async value => {
  try {
      const results = await geocodeByAddress(value);
  const latLng = await getLatLng(results[0]);
  this.setAddress(value);
  this.setCoordinates(latLng);
      
  } catch (error) {
      console.log(error)
  }
  
  // const result=await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?types=country&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`)
  // console.log(result);
  
};
handleLocation=()=>{
  navigator.geolocation.getCurrentPosition(pos=>{
      let lat=pos.coords.latitude,lng=pos.coords.longitude,coords=lat+", "+lng;

      
      return(this.setState({coordinates:{
          lat,
          lng
      }}))
  })
}
  componentDidMount(){
    if(this.props.options.length===0){
      this.props.optionsHandler();
      this.props.optionSelectHandler();
    }
    console.log("Current Options",this.props.options)


  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  selectServiceHandler=(val)=>{
    console.log(val);
    this.setState({service:val.value})
    
    this.props.serviceSelected(val.value);
  }
  selectHandler=(val)=>{
    console.log(val);
    this.setState({city:val.value})
    
    this.props.citySelected(val.value);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    this.props.signUpHandler(this.state)
  }
  render() {
      const {city,options,authError,logout,optionService}=this.props
    const log=this.props.logout?null:<Redirect to="/"/>;
    console.log(this.state)
    return (
      <div className="container">
        {log}
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Sign Up</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id='email' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id='password' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id='firstName' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id='lastName' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="contact">Contact Number</label>
            <input type="text" id='contact' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="city">City</label>
            <Select
                        className="basic-single"
                        classNamePrefix="select"
                        name="City"
                        options={options}
                        placeholder={this.props.city?city:"Search a city..."}
                        defaultValue={this.props.city}
                        onChange={val =>this.selectHandler(val)}
                    />
            
          </div>

          <div className="input-field">
            <label htmlFor="location">Location</label>
            <PlacesAutocomplete
                            value={this.state.address}
                            onChange={this.setAddress}
                            onSelect={this.handleSelect}
                        >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>

                                <input {...getInputProps({ placeholder: "Type address" })} />

                                <div>
                                {loading ? <div>...loading</div> : null}

                                {suggestions.map(suggestion => {
                                    const style = {
                                    backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                                    };

                                    return (
                                    <div {...getSuggestionItemProps(suggestion, { style })}>
                                        {suggestion.description}
                                    </div>
                                    );
                                })}
                                </div>
                            </div>
                            )}
                        </PlacesAutocomplete>
                        <Button onClick={this.handleLocation}>Current Location</Button>
          </div>
          <div className="input-field">
            <label htmlFor="service">Service</label>
            <Select
                        className="basic-single"
                        classNamePrefix="select"
                        name="Service"
                        options={optionService}
                        placeholder={this.props.service?this.props.service:"Search a service..."}
                        defaultValue={this.props.service}
                        onChange={val =>this.selectServiceHandler(val)}
                    />
          </div>
          
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Sign Up as Worker</button>
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
    city:state.service.city,
    service:state.service.serve,
    options:state.service.options,
    optionService:state.service.optionSelect

  }
}


const mapDispatchToProps=dispatch=>{
  return {
    signUpHandler:(data)=>{dispatch(actions.createWorker(data))},
    citySelected:(city)=>{dispatch(actions.selectCity(city))},
    serviceSelected:(service)=>{dispatch(actions.selectService(service))},
    optionsHandler:()=>{dispatch(actions.optionsHandler())},
    optionSelectHandler:()=>{dispatch(actions.optionSelectHandler())}
  }
}
export default GoogleApiWrapper({
  apiKey:`AIzaSyCG7Wtd2ITIV1PATcyIEG_9jETCyoyxui0`
})(connect(mapStateToProps,mapDispatchToProps)(SignUp))

