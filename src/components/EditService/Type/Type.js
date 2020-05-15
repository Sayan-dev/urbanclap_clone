import React, { Component, Fragment } from 'react';
import ServiceEdit from '../../../pages/ServiceEdit';
import ServiceEditTypeDetails from './ServiceEditTypesDetails';
import { Container, Button } from 'react-bootstrap';

class Type extends Component {
    
    render() {
        const {type,change,idVal,val,service}=this.props
        console.log(val)
        return (
            <Fragment>
                
            <Container>
            
                
                <h5 className="grey-text text-darken-3">Edit type {type.name}</h5>
                <div className="input-field">
                    <input type="text" id={`${idVal}.name`} onChange={change} value={type.name}/>
                    <label htmlFor="name">Type name</label>
                </div>

                
                    
                   <ServiceEditTypeDetails sub={this.props.sub} special={service} value={val} service={type.subtype} idVal={`${idVal}.subtype`} change={change}/>
                    
                
            </Container>

            </Fragment>
            
        );
    }
}

export default Type;