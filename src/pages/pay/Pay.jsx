import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import makeRequest from "../../axios.js";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import "./pay.scss";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm.jsx";

const stripePromise = loadStripe(
  "pk_test_51LzX4kLWXZBrl9wXuEP2IGYIXCXIWyvcfcyCuOh3uufZcJLHJxsrHIk4CDI6s4qkGiPnePnLgSz4hTcL0w1iYmYY00pDYc3M3P"
);

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const request = async () => {
      try {
        const res = await makeRequest.post(
          `/orders/create-payment-intent/${id}`
        );

        setClientSecret(res.data.clientSecret);
      } catch (error) {
        console.log(error);
      }
    };
    request();
  }, []);

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="pay">
      <div className="container">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default Pay;
