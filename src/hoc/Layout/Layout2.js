import React, { useState } from 'react';
import { useFirestore, firestoreConnect } from 'react-redux-firebase';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import "./Layout2.css";
import * as actions from "../../store/actions/index";


const Layout2 = (props) => {
    const [count, setCount] = useState(null);
    const [seen,setSeen]=useState(false)

    const db=useFirestore();
    let pending;
    const {workers,auth}=props;
        if(!seen){
            if(count>0){
                if(props.location.pathname==="/worker/pending"){
                setCount(null);
                setSeen(true);
                }
            }
        }
        
    
    setInterval(()=>{
        db.collection("workers").doc(auth.uid)
        .onSnapshot(function(doc) {
            console.log("Current data: ", doc.data());
            const data=doc.data();
            if(data.assigned){
                const len=data.assigned.length;
                setCount(len);
            }

    });

    },2000)

    return (
        <div className="layout2">
            <Container fluid>
                <Row className="layout2_head">
                    <Col xs={4}><Link to="/worker/assigned">Assigned</Link></Col>
                    <Col xs={4}><Link to="/worker/pending">Pending <span className="layout2_alert">{count}</span></Link></Col>
                    <Col xs={4}><Link to="/worker/done">Completed</Link></Col>
                </Row>
            </Container>
            {props.children}
        </div>
    );
};

const mapStateToProps=state=>{
    return{
        logout:state.firebase.auth.isEmpty,
        auth:state.firebase.auth,
        workers:state.firestore.data.workers

    }
}
const mapDispatchToProps=dispatch=>{
  return{
      logOut:()=>{dispatch(actions.logOut())}
  }
}
export default compose(firestoreConnect([{collection:"workers"}]),connect(mapStateToProps,mapDispatchToProps))(withRouter(Layout2))
