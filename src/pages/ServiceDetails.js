import React, { Fragment } from 'react'
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Jumbotron, Row, Container, Col, Breadcrumb } from 'react-bootstrap';
import "./ServiceDetails.css";
import Workers from '../components/Workers/Workers';
import {Link} from "react-router-dom";
import ServicePerks from '../components/ServicePerks/ServicePerks';

const ServiceDetails = (props) => {
  // const id = props.match.params.id;
  const {service,tag,city,workers,id}=props;
  if(service){
    return (
      <Fragment>
      <Container className="description_head" fluid>
      <Breadcrumb className="description_bread">
  <Breadcrumb.Item >Home</Breadcrumb.Item>
  <Breadcrumb.Item ><Link to="/">
    {city}</Link>
  </Breadcrumb.Item>
  <Breadcrumb.Item active>{service && service.name}</Breadcrumb.Item>
</Breadcrumb>
        <Row>
          <Jumbotron className="description_name">
            <h1>{`${tag} in ${city}`}</h1>
            <p>Lorem Ipsum</p>
          </Jumbotron>
          <Col className="ml-auto">
            <ServicePerks tag={tag} id={id} service={service.type}/>
          </Col>
        </Row>

      </Container>
      <Container>
        <Workers
          city={city}    
          workers={workers}
          service={service}
        />
        
      </Container>
      </Fragment>
    )

  }
  return null;
  
}

const mapStateToProps=(state,ownProps)=>{
  const id = ownProps.match.params.id.split("-");
  console.log("ID dekho",id);
  const services=state.firestore.data.services
  const workers=state.firestore.data.workers
  const service=services?services[id[0]]:null
  console.log(state)
  return{
    service:service,
    workers:workers,
    tag:id[1],
    id:id[0],
    city:state.service.city,



  }
}

export default compose(firestoreConnect([{collection:'services'},{collection:"workers"}]),connect(mapStateToProps))(ServiceDetails)


