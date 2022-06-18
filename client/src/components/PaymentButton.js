import React from "react";
import { useDispatch } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import stripePayment from "../store/reducers/billing";
import { updateCredits } from "../store/reducers/auth";

export default function PaymentButton() {
  const dispatch = useDispatch();

  async function handleToken(token) {
    const res = await dispatch(stripePayment(token));
    const success = stripePayment.fulfilled.match(res);
    if (success) dispatch(updateCredits(res.payload));
  }

  return (
    <StripeCheckout
      name="Emaily"
      currency="INR"
      description="Rs.500 for 5 credits"
      amount={50000}
      token={handleToken}
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
    >
      <span className="text-primary pointer">Buy Credits</span>
    </StripeCheckout>
  );
}
