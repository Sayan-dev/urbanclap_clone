import React, { Component } from 'react';
import Service from './Service/Service';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Services extends Component {
    // state={
    //     services:{
    //         0:{
    //             tag:"Salon at home",
    //             name:"Salon at home for women",
    //             Workers:{
    //                 "Ganga Devi":{
    //                     email:"jkh@gmail.com",
    //                     city:"Kolkata"
    //                 },
    //                 "Madhu Mala":{
    //                     email:"kala@gmail.com",
    //                     city:"Delhi"
    //                 }
    //             }
    //         },
    //         1:{
    //             tag:"Massage",
    //             name:"Body Massage for Men",
    //             Workers:{
    //                 "Milkha Singh":{
    //                     email:"bali@gmail.com",
    //                     city:"Kolkata"
    //                 },
    //                 "Nand Raja":{
    //                     email:"kla@gmail.com",
    //                     city:"Delhi"
    //                 }
    //             }
    //         },
    //         2:{
    //             tag:"Massage",
    //             name:"Body Massage for women",
    //             Workers:{
    //                 "Milkha Putt":{
    //                     email:"bali@gmail.com",
    //                     city:"Kolkata"
    //                 },
    //                 "Nandini Raja":{
    //                     email:"kla@gmail.com",
    //                     city:"Delhi"
    //                 }
    //             }
    //         }
    //     },
    //     city:""

    // }
    render() {
        const {services}=this.props
        const tags=[];
        services && services.map(ele=>{
            return(
                ele.tag.map(element=>{
                    if(!tags.find(collection=>{
                        return element===collection;
                    })){
                        tags.push(element)
    
                    }
                    return null;
                })
        )
            

            
        })
        const service=tags.map(tag=>{
            return(
                <Container>
                    <Row>
                    <h4>{tag}</h4>
                    </Row>
                    <Row>
                    {services.map((element,index)=>{
                        if(element.tag.find(ele=>ele===tag)){
                            return(
                                <Col xs={4}>
                        
                        <Link to={this.props.city?`/service/${element.name}-${tag}`:"/"}>
                            
                                <Service key={index}
                            details={element}
                                />
                                

                        </Link>
                        </Col>
                                
                            
                            )

                        }
                        return null;
                        
                    })}

                    </Row>
                    

                    
                    

                </Container>
                
                
                

            )
        })
        console.log(tags);
        return (
            <React.Fragment>
                {service}

            </React.Fragment>
            
        );
    }
}

const mapStateToProps=state=>{
    console.log(state)
    return{
      city:state.service.city
  
    }
  }

  export default connect(mapStateToProps)(Services)
