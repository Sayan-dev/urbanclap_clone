import React, { Component, useState, Fragment } from 'react';
import { Container, Form, Row, Col, InputGroup, DropdownButton, FormControl, Dropdown, Jumbotron } from 'react-bootstrap';
import Select from 'react-select';
import "./Home.css";
import Services from '../components/services/Services';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import * as actions from "../store/actions/index.js";
import HomeWorker from './HomeWorker';

// import 'react-select/dist/react-select.css';
// import 'react-virtualized/styles.css'
// import 'react-virtualized-select/styles.css'

class Home extends Component {
    state={
      options : [
        // ...
        { value: 'Kolkata', label: 'Kolkata' },
        { value: 'Delhi', label: 'Delhi' },
        { value: 'Bangalore', label: 'Bangalore' },
        { value: 'Gujrat', label: 'Gujrat' },
        // ...
    ],
    citySelected:"",

    }
    componentDidMount(){
      if(this.props.options.length===0){
        this.props.optionsHandler();
        this.props.citySelected("Kolkata")
      }


    }
    
    submitHandler=(e)=>{
        e.preventDefault();

    }

    // CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    //     <a
    //       href=""
    //       ref={ref}
    //       onClick={(e) => {
    //         e.preventDefault();
            
    //         onClick(e);
    //       }}
    //     >
    //       {children}
    //       &#x25bc;
    //     </a>
    //   ));
      
    //   // forwardRef again here!
    //   // Dropdown needs access to the DOM of the Menu to measure it
    // CustomMenu = React.forwardRef(
    //     ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    //       const [value, setValue] = useState('');
      
    //       return (
    //         <div
    //           ref={ref}
    //           style={style}
    //           className={className}
    //           aria-labelledby={labeledBy}
    //         >
    //           <FormControl
    //             autoFocus
    //             className="mx-3 my-2 w-auto"
    //             placeholder="Type to filter..."
    //             onChange={(e) => {setValue(e.target.value)}}
    //             value={value}
    //           />
    //           <ul className="list-unstyled">
    //             {React.Children.toArray(children).filter(
    //               (child) =>
    //                 !value || child.props.children.startsWith(value)||child.props.children.toLowerCase().startsWith(value) ,
    //             )}
    //           </ul>
    //         </div>
    //       );
    //     },
    //   );
    
      selectHandler=(val)=>{
        console.log(val);
        // this.setState({citySelected:val.value})
        
        this.props.citySelected(val.value);
      }
    render() {

      const {options,auth,workers}=this.props; 
      const serve=(
        options.length>0?
        <Services 
            city={this.state.citySelected}
            services={this.props.services}
            
          />

      :"Loading Services..."
      );
      let homePage;
      if(!workers[auth.uid]){                          //If the logged in account is not a worker's account 
        if(!this.props.logout){
          if(this.props.auth.emailVerified){
  
            homePage=(
              <Fragment>
          <Container fluid className="home_container">
          <Row xs={1}>
              <Col xs={12} sm={2} md={3}></Col>
              <Col className="home_col" xs={12} sm={8} md={6}>
  
                      <h1>Choose a city to get the services</h1>
                      <p>
                      <Select
                          className="basic-single"
                          classNamePrefix="select"
                          name="City"
                          options={options}
                          placeholder={this.props.city?this.props.city:"Search a city..."}
                          defaultValue={this.props.city}
                          onChange={val =>this.selectHandler(val)}
                      />
                      </p>
                      
  
                
                  
                  
              </Col>
              <Col xs={12} sm={2} md={3}></Col>
          </Row>
  
      </Container>
      
      {serve}
      
        
      </Fragment>
            )
          }else{
            homePage="Please verify your account....."
          }
  
        }else{
          homePage=(
            <Fragment>
          <Container fluid className="home_container">
          <Row xs={1}>
              <Col xs={12} sm={2} md={3}></Col>
              <Col className="home_col" xs={12} sm={8} md={6}>
  
                      <h1>Choose a city to get the services</h1>
                      <p>
                      <Select
                          className="basic-single"
                          classNamePrefix="select"
                          name="City"
                          options={options}
                          placeholder={this.props.city?this.props.city:"Search a city..."}
                          defaultValue={this.props.city}
                          onChange={val =>this.selectHandler(val)}
                      />
                      </p>
                      
  
                
                  
                  
              </Col>
              <Col xs={12} sm={2} md={3}></Col>
          </Row>
  
      </Container>
      
      {serve}
      
        
      </Fragment>
          )
        }
        

      }else{
        homePage=<HomeWorker profile={workers && workers[auth.uid]}/>
      }
      
      
      
        return (
            
            <React.Fragment>
              {homePage}

            </React.Fragment>
        );
    }
}

const mapStateToProps=state=>{
  console.log(state)
  return{
    services:state.service.services,
    auth:state.firebase.auth,
    workers:state.firestore.data.workers,
    city:state.service.city,
    options:state.service.options,
    logout:state.firebase.auth.isEmpty,

  }
}

const mapDispatchToProps=dispatch=>{
  return{
    citySelected:(city)=>{dispatch(actions.selectCity(city))},
    optionsHandler:()=>{dispatch(actions.optionsHandler())}
  }
}

export default compose(firestoreConnect([{collection:'services'},{collection:"workers"}]),connect(mapStateToProps,mapDispatchToProps))(Home)

