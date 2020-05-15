import React, { Component, Fragment } from 'react';
import Type from './Type/Type';
import { Button } from 'react-bootstrap';

class TypeEdit extends Component {

    componentDidMount(){
        console.log(this.props.types)

    }
    
    render() {
        const {types,change,service}=this.props
        return (
            <Fragment>
                <Button variant="primary" onClick={this.props.add}>Add</Button>

                {
                    types && Object.keys(types).map(key=>{
                        return <Type 
                        service={service} 
                        sub={()=>this.props.addSub(key)} 
                        type={types[key]} 
                        idVal={`type.${key}`}
                        val={key}  
                        change={change}/>
                    })
                }
            </Fragment>
        );
    }
}

export default TypeEdit;