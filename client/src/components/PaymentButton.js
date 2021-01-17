import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { useDispatch } from "react-redux";
import stripePayment from "../store/reducers/billing";

export default function PaymentButton({ children }) {
  const dispatch = useDispatch();

  return (
    <StripeCheckout
      name="Emaily"
      description="Rs.500 for 5 credits"
      amount={500}
      token={(token) => dispatch(stripePayment(token))}
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
    >
      {children}
    </StripeCheckout>
  );
}
