import React, { useState, Fragment } from 'react';
import { Button, Container, Row, Col, Form, Modal } from 'react-bootstrap';
import {Elements, CardElement, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import PaymentSuccess, { CheckoutForm } from './PaymentSuccess/PaymentSuccess';
// import {Elements} from 'react-stripe-elements';


const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    }
  };


const Payment =(props) => {
    const stripePromise = loadStripe('pk_test_dC22wfCUx1e8SKREycb7j6N700X2DDrEZR');
    const {total,success,paysuccess}=props
    return (
       
            <Fragment>
                <Container>
                    <Row>
                        <Col>
                        <Elements stripe={stripePromise}>
                        <PaymentSuccess paysuccess={paysuccess} success={success} total={total}/>
 
                        </Elements>
                        </Col>
                        <Col>
                        <Row>
                          <Col>
                          <h4>Payment Details</h4>

                          </Col>
                        </Row>
                        <Row><Col xs={8}>Service Charge</Col><Col xs={4}>{`Rs ${props.total}`}</Col></Row>
                        <hr></hr>
                        <Row><Col xs={8}>Additional Service Charge</Col><Col xs={4}>{`Rs ${props.total}`}</Col></Row>
                        <hr></hr>
                        <Row><Col xs={8}>Total Amount Payable</Col><Col xs={4}>{`Rs ${props.total}`}</Col></Row>
                        <hr>
                        </hr>
                        <Row><Col xs={8}><b>Amount Payable</b></Col><Col xs={4}>{`Rs ${props.total}`}</Col></Row>


                        
                        </Col>
                    </Row>
                    
                </Container>
                
                <Modal.Footer>
      {/* <Button onClick={this.props.onHide}>Close</Button> */}
      {/* <Button onClick={props.prevStep}>Previous</Button> */}
                {/* <Button onClick={props.nextStep}>Next</Button> */}
    </Modal.Footer>
        
            </Fragment>
                
        
    );
};
  
export default Payment;
