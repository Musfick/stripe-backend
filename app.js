const express = require('express')
const app = express()

const stripe = require("stripe")("sk_test");

app.use(express.static("."));
app.use(express.json());
 
app.get('/', function (req, res) {
  res.send('Hello World')
})

const calculateOrderAmount = items => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 255;
  };
  app.post("/create-payment-intent", async (req, res) => {
    const { items } = req.body;
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "usd"
    });
    res.send({
      clientSecret: paymentIntent.client_secret
    });
  });
  
 
app.listen(3000, ()=> console.log("Server is running on port 3000"))