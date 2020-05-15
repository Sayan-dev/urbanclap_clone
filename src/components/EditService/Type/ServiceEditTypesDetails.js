import React, { Component, Fragment } from 'react';
import { Container, Button } from 'react-bootstrap';

class ServiceEditTypeDetails extends Component {
    state={
        
    }
    render() {
        const {service,change,idVal,special,value}=this.props

        return (
            <Container>
                <Button onClick={this.props.sub}>Add</Button>
                {
                    Object.keys(service).map(key=>{
                            return (<form className="white" onSubmit={this.handleSubmit}>
                            <h5 className="grey-text text-darken-3">Edit Service {key}</h5>
                            {
                            
                            Object.keys(service[key]).map(tag=>{
                                return (<div className="input-field">
                                <input type="text" id={`${idVal}.${key}.${tag}`} onChange={change} value={service[key][tag]}/>
                                <label htmlFor="name">Service {tag}</label>
                            </div>)
                            })}
                            
                            </form>)
                    })
                }
            </Container>
        );
    }
}

export default ServiceEditTypeDetails;