import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe("pk_test_51ROXr9I6pDedtISZyB3EAU1eOGpeF0z79KeoXpDC8DPMA2y9MJWkxgvbamZRK7zv9h6QITmJ0EDG8FIJoN5qmx6700pZNpk0sG");

createRoot(document.getElementById('root')).render(
  <Elements stripe={stripePromise}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Elements>
    

)
