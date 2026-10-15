require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/api/payment-sessions', async (req, res) => {
  try {
   const { country, productId } = req.body;

    // Only allow the two countries in this demo

const products = {
  classic: { HKD: 12000, EUR: 1500 },
  rugged: { HKD: 18000, EUR: 2200 }
};

const currencies = {
  HK: 'HKD',
  NL: 'EUR'
};

if (!currencies[country] || !products[productId]) {
  return res.status(400).json({
    error: 'Unsupported country or product'
  });
}

const currency = currencies[country];
const amount = products[productId][currency];

console.log('Creating session:', {
  country,
  productId,
  currency,
  amount
});
    const response = await fetch(
      'https://api.sandbox.checkout.com/payment-sessions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.CHECKOUT_SECRET_KEY}`,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          amount,
          currency,
          enabled_payment_methods: ['card', 'applepay', 'googlepay', 'ideal'],
          processing_channel_id: process.env.CHECKOUT_PROCESSING_CHANNEL_ID,
          reference: `case-demo-${Date.now()}`,
          billing: {
            address: { country }
          },
          success_url: 'http://localhost:3001/success',
          failure_url: 'http://localhost:3001/failure'
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
  console.error(
    'Payment Session request failed:',
    response.status
  );

  return res.status(502).json({
    error: 'Unable to create Payment Session'
  });
}

    // Return the unmodified Payment Session response to Flow.
    res.status(201).json(data);
  } catch (error) {
    console.error('Payment Session error:', error.message);

    res.status(500).json({
      error: 'Internal server error'
    });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});
app.get('/api/config', (req, res) => {
  res.json({
    checkoutPublicKey: process.env.CHECKOUT_PUBLIC_KEY
  });
});


app.get('/success', (req, res) => {
  res.send(`
    <h1>Payment Return Page</h1>
    <p>You have returned from the checkout flow.</p>
    <p>This redirect does not confirm that the payment succeeded.</p>
    <p>Please verify the final payment status using the Checkout.com API response or webhook.</p>
    <a href="/">Return to store</a>
  `);
});

app.get('/failure', (req, res) => {
  res.send(`
    <h1>Payment Not Completed</h1>
    <p>You have returned to the checkout failure page.</p>
    <p>Please verify the final payment status before retrying.</p>
    <a href="/">Return to store</a>
  `);
});


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});