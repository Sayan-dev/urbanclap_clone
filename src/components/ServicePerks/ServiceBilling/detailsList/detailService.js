import React, { Fragment } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

const DetailService = (props) => {
    const {subtype,id,order}=props
    const add=(
        order[subtype.name]?order[subtype.name]:null
    )
    return (
        <Fragment >
            <Row id={props.id} >
            
            <Col>
           
                <h5>{subtype.name} </h5>
                <p>{subtype.time} Min</p>
                <p>{subtype.price} Rs</p>
            </Col>
            <Button onClick={props.clicked}>View Details</Button>
        </Row>
        <Row>{add?
            <Col>
                <Button onClick={()=>props.sub(subtype.name,subtype)}>-</Button>{add}<Button onClick={()=>props.add(subtype.name,subtype)}>+</Button>
            </Col>:
            <Col><Button onClick={()=>props.addToCart(subtype.name,subtype)}>Add to Cart</Button></Col>}
        </Row>

        </Fragment>
        
    );
};

export default DetailService;