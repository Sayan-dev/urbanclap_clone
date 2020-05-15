import React, { Component, Fragment } from 'react';
import { Container, Col, Row, Button, Modal } from 'react-bootstrap';
import "./TimeAndDate.css";

 
import "react-datepicker/dist/react-datepicker.css";

class TimeAndDate extends Component {
  state={
    days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

  }
  handleClick=(e)=>{
    // e.preventDefault();
    console.log(e.target.id);
  }
  // handleDate=(e)=>{
  //   console.log(e.target.parentElement.parentElement.id)
  // }
    render() {
        const {onChange,time,startDate,handleDate}=this.props
        const days=[];
        let d=new Date();
        for(let i=1;i<=4;i++){
          
          d.setDate(d.getDate()+1)
          const id=d.getDay();
          //console.log(typeof startDate);
          //console.log(d);
          let day=i===1?"Tomorrow":this.state.days[d.getDay()]
          days.push(<Col className={`time ${parseInt(startDate)===id?"time_active":null}`} key={d} id={id} xs={3}><Row onClick={(e)=>handleDate(e)}><Col>{day}</Col></Row><Row><Col>{d.getDate()}</Col></Row> </Col>)
        
          // days.push(d.getDate())
      }

        const times=[]

        let date=new Date();
        date.setHours(8);
        date.setMinutes(0);
        for(let i=0;i<20;i++){
          let j=date.getHours()
          const min=date.getMinutes();
          date.setMinutes(date.getMinutes()+30)


          let hour=j>=12?j===12?`${j}:${min===0?'00':min} PM`:`${j-12}:${min===0?'00':min} PM`:`${j}:${min===0?'00':min} AM`
          times.push(hour)

        }
        return (
            <Fragment>
                <Container className="time_cont">
                  <Row>
                    <h3>Pick the day and time you want your service</h3>
                    </Row>
                  <Row>

                    <Col>
                      <h5>Pick a day</h5>
                      <Container>
                        <Row>
                          {days.map((e=>e))}
                          <Col></Col>
                        </Row>
                      </Container>
                    </Col>
                    </Row>
                    <Row className="time_row">
                      <Col >
                        <h5>Pick a time</h5>
                        <Container >
                          <Row xs={3}  >
                          {
                            times.map(e=>{
                              return <Col xs={4}  className={`time ${time===e?"time_active":null}` } onClick={(e)=>onChange(e)} id={e}>{e}</Col>
                            })

}
                          </Row>
                          
                        </Container>
                      </Col>

                    </Row>

                  
          
          
        </Container>
        <Modal.Footer>
      {/* <Button onClick={this.props.onHide}>Close</Button> */}
        <Button disabled={!(time && startDate)} onClick={this.props.nextStep}>Next</Button>
    </Modal.Footer>
        
            </Fragment>
        );
    }
}

export default TimeAndDate;