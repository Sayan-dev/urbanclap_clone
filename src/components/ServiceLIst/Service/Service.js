import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, Button } from 'react-bootstrap';

const Service = (props) => {
    return (
        <Link to={`/service-add/${props.id}`}>
        <Row id={props.id}>
            <Col xs={10}>
            <Row xs={1}>
            {props.name}

            </Row>
            <Row >
                {props.tag?props.tag.map(e=>{
                    return <Col  xs={4}>{e}</Col>;
                }):null}
            </Row>
            </Col>
            <Col xs={1}>
            </Col>
            <Col xs={1}>
                <button className="btn red darken-1" onClick={props.clicked} >Delete </button>
            </Col>
            
            
        </Row>
        </Link>
        
    );
};

export default Service;