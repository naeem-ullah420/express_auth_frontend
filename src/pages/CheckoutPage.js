import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { useParams } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import OrderSummaryComponent from '../components/CartPageComponents/OrderSummaryComponent';
import { useCartContext } from '../contexts/CartContext';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51JqBzkJQatz8KWO476zuz9JRuDAiw1b1ucZlqvB1ZH7goZztKHrlNdO0OVQstVlcwQhSxkG1q0Q69NLTX5sF4gXc00GqVyAWuM');

export default function CheckoutPage() {
  const params = useParams()
  const options = {
    // passing the client secret obtained from the server
    clientSecret: params.client_secret,
  };
  const {products} = useCartContext()

  return (
    <Container className='mt-5' fluid>
      <Row>
        <Col md={6}>
          <OrderSummaryComponent products={products} />
        </Col>
        <Col md={6}>
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
          </Elements>
        </Col>
      </Row>
    </Container>
    
  );
};