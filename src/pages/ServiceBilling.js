import React, { Component, Fragment, useState } from 'react';
import { Col, Row, Container, Button } from 'react-bootstrap';
import Tags from '../components/ServicePerks/ServiceBilling/tags';
import Details from '../components/ServicePerks/ServiceBilling/details';
import DetailsList from '../components/ServicePerks/ServiceBilling/detailsList/detailsList';
import { compose } from 'redux';
import {Link, withRouter} from "react-router-dom";
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import * as actions from "../store/actions/index.js";
import OrderConfirm from '../components/Modals/OrderConfirm';


class ServiceBilling extends Component {
    state={
        subtype:"",
        orders:{},
        total:null,
        modalShow:false
    }
    componentDidMount(){
        console.log(this.state)
    }
    detailsHandler=(e)=>{
        console.log(e.target.parentElement.getAttribute("id"))
        this.setState({subtype:e.target.parentElement.getAttribute("id")})
    }
    closeHandler=()=>{
        this.setState({subtype:""})
    }
    addToCartHandler=(name,subtype)=>{
        // console.log(name)
        // const newOrder={
        //     ...this.state.orders,
        //     [name]:1
        // }
        // const newTotal=this.state.total+parseInt(subtype.price)
        // this.setState({orders:newOrder,total:newTotal})
        this.props.addToCart(name,subtype);

        
    }
    modalHandler=()=>{
        this.setState({open:true})
    }
    addHandler=(name,subtype)=>{
        // const add=this.state.orders[name]+1
        // const newOrder={
        //     ...this.state.orders,
        //     [name]:add
        // }
        // const newTotal=this.state.total+parseInt(subtype.price)
        
        // this.setState({orders:newOrder,total:newTotal})
        this.props.addOrder(name,subtype);

    }
    subHandler=(name,subtype)=>{

        // const sub=this.state.orders[name]-1
        // const newOrder={
        //     ...this.state.orders,
        //     [name]:sub
        // }
        // if(sub===0){
        //     delete newOrder[name]
        // }
        
        // const newTotal=this.state.total-parseInt(subtype.price)
        // this.setState({orders:newOrder,total:newTotal})
        this.props.subOrder(name,subtype);
    }
    totalHandler=(num,subtype)=>{
        
        // let newTotal;
        
        // newTotal=this.state.total+num*subtype.price;
        
        // this.setState({total:newTotal})

    }
    setModalShow=(val)=>{
        this.setState({modalShow:val})
    }
    render() {
        const {service,id,tag,orders,total,userId,city}=this.props

        console.log("bill",orders,service)
        return (
            
            <Fragment>
                <Container fluid >
                <Link to={`/service/${id}-${tag}`}>{"<- Go Back"}</Link>
                <Row>
                    <Col style={{zIndex:"1",borderRight:"1px solid black"}} xs={3} >
                        <Tags service={service}/>
                    </Col>
                    
                    <Col  xs={4} >
                        <DetailsList add={(name,subtype)=>this.addHandler(name,subtype)} sub={(name,subtype)=>this.subHandler(name,subtype)} order={this.props.orders} addToCart={(name,subtype)=>this.addToCartHandler(name,subtype)} details={this.detailsHandler} service={service}/>

                    </Col >
                    {/* <Col  style={{position:"fixed",zIndex:"1",borderLeft:"1px solid black"}} xs={5}></Col> */}
                       
                    <Col style={{zIndex:"1",borderLeft:"1px solid black"}} className="ml-auto"  xs={5}>
                        <Details close={this.closeHandler} sub={this.state.subtype} service={service}/>
                    </Col>
                </Row>
                
            
            </Container>
            {
                this.props.total>0?<Container fluid style={{zIndex:"100",position:"fixed",bottom:"0px",left:"0px",backgroundColor:"black",color:"white"}}>
                
                    <Row>
                        <Col xs={10}>
                            <Button onClick={this.props.resetHandler}> X </Button>
                            
                        </Col>
                        <Col className="ml-auto">
                        {Object.keys(this.props.orders).length}
                            {this.props.total}
                            {
                                this.props.logout?<Link to="/signin">Continue</Link>:<Link onClick={()=>this.setModalShow(true)}>Continue</Link>
                            }
                            
                        
                        </Col>
                    </Row>
                
            </Container>:null
            }
            
            <OrderConfirm city={city} usrId={userId && userId} total={total} orders={orders} name={service && service.name} total={this.props.total} show={this.state.modalShow} onHide={() => this.setModalShow(true)} />

            </Fragment>
        );
    }
}

const mapStateToProps=(state,ownProps)=>{
    const id = ownProps.match.params.id.split("-");
    console.log("ID dekho",id);
    const services=state.firestore.data.services
    // const workers=state.firestore.data.workers
    const service=services?services[id[0]]:null
    console.log(state)
    return{
      service:service,
    //   workers:workers,
      tag:id[1],
      id:id[0],
      city:state.service.city,
      userId:state.firebase.auth.uid,
      logout:state.firebase.auth.isEmpty,
      orders:state.service.orders,
      total:state.service.total

  
  
    }
  }

  const mapDispatchToProps=dispatch=>{
      return{
          addToCart:(name,subtype)=>{dispatch(actions.addToCart(name,subtype))},
          addOrder:(name,subtype)=>{dispatch(actions.addOrder(name,subtype))},
          subOrder:(name,subtype)=>{dispatch(actions.subOrder(name,subtype))},
          resetHandler:()=>{dispatch(actions.resetOrder())}
      }
  }
  
  export default compose(firestoreConnect([{collection:'services'}]),connect(mapStateToProps,mapDispatchToProps))(ServiceBilling) 
  
  
  