import React, { Fragment } from 'react';
import { compose } from 'redux';
import * as actions from "../../store/actions/index.js";

import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { Form, Button, Col, Container, Row } from 'react-bootstrap';

const ServicePerks = (props) => {
    const {service,id,tag}=props
    console.log(service);
    // const keys=Object.keys(service); ////An algo to show 4 types of service from the type list
    return (
        <Fragment>
            {service?
            Object.keys(service).map(key=>{
                return <Link to={`/serviceBilling/${id}-${tag}`}><Row>{service[key].name}</Row></Link>
            })
        
        :null}
            
            
        </Fragment>
    );
};

export default ServicePerks;
  
