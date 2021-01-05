import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { handleToken } from "../actions";
import { useDispatch } from "react-redux";

export default function Payments() {
  const dispatch = useDispatch();
  return (
    <StripeCheckout
      name="Emaily"
      description="$5 for 5 credits"
      amount={500}
      token={(token) => dispatch(handleToken(token))}
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
    >
      <button className="btn red z-depth-1">Add credits</button>
    </StripeCheckout>
  );
}
