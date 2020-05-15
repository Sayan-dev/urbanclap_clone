import React, { Component, Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';
import DetailService from './detailService';

class DetailsList extends Component {
    render() {
    const {service}=this.props
    const types=service?service.type:"";
    console.log(service && types[0].subtype[0])

        return (
            <div >
                {
                    Object.keys(types).map(key=>{
                        return (
                            <Row id={`${key}-scroll`}>
                                <Col><h4>{types[key].name}</h4>
                            {Object.keys(types[key].subtype).map(tag=>{
                                return<DetailService add={(name,subtype)=>this.props.add(name,subtype)} sub={(name,subtype)=>this.props.sub(name,subtype)} order={this.props.order} addToCart={(name,subtype)=>this.props.addToCart(name,subtype)} id={`${tag}-${key}`} clicked={this.props.details} subtype={types[key].subtype[tag]}/>

                            })}
</Col>
                            </Row>
                            
                            
                        
                        )
                    })
                }
            </div>
        );
    }
}

export default DetailsList;