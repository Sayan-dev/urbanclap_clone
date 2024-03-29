import React from "react";
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import axios from "axios";
import { Button } from "react-bootstrap";

const PaymentSuccess = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  

  const handleSubmit = async (event) => {
    // Block native form submission.
    
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      const {id}=paymentMethod;
      console.log('id: ', id);


      try{
        const {data}=await axios.post("http://localhost:5000/app-clone-42d4a/us-central1/getPaymentIntent",{
          id,
          amount:props.total
        })
        return props.success();
      }catch(error){
        console.log("Error",error)
      }

      

    }
  };

  return (
    <form onSubmit={handleSubmit}>
           <CardElement />
      <Button type="submit" disabled={!stripe}>
        Pay
      </Button>
    </form>
  );
};

export default PaymentSuccess;
