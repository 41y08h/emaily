import apiCall from "../apiCall";
import { updateCredits } from "./auth";

const stripePayment = (token) =>
  apiCall({
    url: "/billing/stripe",
    method: "post",
    data: token,
    onSuccess: [updateCredits.type],
  });

export default stripePayment;
