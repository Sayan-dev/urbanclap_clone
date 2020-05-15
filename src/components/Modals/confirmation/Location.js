import React, { Component, Fragment } from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
  } from "react-places-autocomplete";
import ReactMapGL from "react-map-gl";

  

export class Location extends Component {
    state={
        address:"",
        coordinates:{
            lat: 22.445237,
            lng: 88.416412
        },
        viewport:{
            lat: 22.445237,
            lng: 88.416412,
            width:"90%",
            height:"100%",
            zoom:14

            
        }
    }
    

    handleSelect = async value => {
        try {
            const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        this.props.setAddress(value);
        this.props.setCoordinates(latLng);
            
        } catch (error) {
            console.log(error)
        }
        
        // const result=await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?types=country&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`)
        // console.log(result);
        
      };
    onMarkerClick=(e)=>{
        console.log(e)
    }
    setViewport=(view)=>{
        const newPort={...view};
        this.setState({viewport:newPort})
    }
    
    render() {
        const style = {
            width: '100%',
            height: '100%'
          }
        return (
            <Fragment>
                <Container>
                    <Row style={{height:"300px"}}>
                    <Col style={{borderRight:"1px solid black"}} xs={8} sm={6} >
                    <Map style={style}
                    center={this.props.coordinates}
          initialCenter={{
            lat: 22.445237,
            lng:  88.416412
          }} google={this.props.google} zoom={14}>
 
                     <Marker onClick={this.onMarkerClick}
                            name={'Current location'} 
                            position={this.state.coordinates}
                    />

                    {/* <InfoWindow onClose={this.onInfoWindowClose}>
                        <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                        </div>
        </InfoWindow> */}
                    </Map>
                    {/* <ReactMapGL
                        {...this.state.viewport}
                        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                        mapStyle={"mapbox://styles/ss13ayan/ck9ily62j24jw1iqwqhrgdfeg"}
                        onViewportChange={(viewport)=>{this.setViewport(viewport)}}

                    >Marker here</ReactMapGL> */}

                    </Col>
                    <Col xs={4} sm={6}>
                    <Row>
                        What is the location for service?
                        <PlacesAutocomplete
                            value={this.props.address}
                            onChange={(e)=>this.props.setAddress(e)}
                            onSelect={this.handleSelect}
                        >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                                <p>Latitude: {this.props.coordinates.lat}</p>
                                <p>Longitude: {this.props.coordinates.lng}</p>

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
                        <Button onClick={this.props.handleLocation}>Current Location</Button>
                    </Row>
                    
                    </Col>
                    
                    </Row>
                    <Row>
                <Button onClick={this.props.nextStep}>Next</Button>

                    </Row>
                    
                </Container>
                
                
            </Fragment>
        );
    }
}

export default GoogleApiWrapper({
    apiKey:`AIzaSyCG7Wtd2ITIV1PATcyIEG_9jETCyoyxui0`
  })(Location)