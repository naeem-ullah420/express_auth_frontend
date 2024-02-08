import {
  useStripe, 
  useElements, 
  PaymentElement,
  AddressElement,

} from '@stripe/react-stripe-js';
import { useCartContext } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Form } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useState } from 'react';

const CheckoutForm = () => {
  
  const failedNotify = (m) => toast.error(m);
  const successfulNotify = (m) => toast.success(m);

  const stripe = useStripe();
  const elements = useElements();
  const {resetCart} = useCartContext()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  // const paymentElement = elements.create('payment')

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setLoading(true)
    try {
      const result = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,
        // confirmParams: {
          // payment_method_data:{
          //   billing_details:{
          //     'city': '',
          //     'state': '',
          //     'line1': '',
          //     'line2': '',
          //     'postal_code': ''
          //   }
          // }
        //   return_url: "https://example.com/order/123/complete",
        // },
        redirect: 'if_required'
      });

      if (result.error) {
        failedNotify("Failed to charge the payment")
        // Show error to your customer (for example, payment details incomplete)
        console.log(result.error.message);
      } else {
        successfulNotify("Your payment has been successfully charged")
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
        resetCart()
        navigate("/")
      }
    } catch(e) { 
      console.log("error: ", e)
    }
    setLoading(false)
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement/>
      <AddressElement options={{
        mode: 'billing',
        defaultValues:{
          phone: 'string',
          // address:{
          //   postal_code:'string',
          //   country:'string',
          //   state:'string'
          // }
        },
        fields:{
          phone: 'always',
        }
      }}/>
      <Button type='submit' variant='primary' className='mt-2' disabled={!stripe || loading}>
        {!loading ? 'Pay Amount' : 'Processing....'}
      </Button>
    </form>
  )
};

export default CheckoutForm;