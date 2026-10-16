# Checkout.com Payment Demo

This project is a simple mobile phone case store built as part of my Checkout.com case study. It demonstrates how Checkout.com can be integrated into a website to accept payments.

## What the Project Does

- Displays phone cases for customers in Hong Kong and the Netherlands.
- Supports different products, prices and currencies (HKD and EUR).
- Uses Checkout.com Flow and the Payment Sessions API to process payments.
- Uses a Node.js and Express backend to create Payment Sessions.
- Allows customers to test card payments and Google Pay in the Checkout.com Sandbox.

## How to Run the Project

### 1. Install the dependencies

Make sure Node.js and npm are installed, then run:

```bash
git clone https://github.com/kyallxiao/checkout-demo.git
cd checkout-demo
npm install
```

### 2. Set up the environment variables

Create a `.env` file using `.env.example` as a template.

Add your own Checkout.com Sandbox credentials:

```env
PORT=3001
CHECKOUT_SECRET_KEY=your_sandbox_secret_key
CHECKOUT_PUBLIC_KEY=your_sandbox_public_key
CHECKOUT_PROCESSING_CHANNEL_ID=your_processing_channel_id
```

Replace the example values with your own credentials. Do not share or commit your `.env` file.

### 3. Start the application

Run:

```bash
npm start
```

Then open http://localhost:3001 in your browser.

## Testing Results

I successfully tested the following payment scenarios in the Checkout.com Sandbox:

| Market | Payment Method | Amount | Result |
|---|---|---:|---|
| Netherlands | Visa | EUR 15.00 | Captured |
| Hong Kong | Mastercard | HKD 180.00 | Captured |
| Hong Kong | Google Pay | HKD 120.00 | Captured |

Payment results were confirmed through API responses. No real payments were processed.

## Known Limitations

- The project runs locally and has not been deployed online.
- I could not complete an iDEAL | Wero payment because an access error occurred at the ING test endpoint.
- Apple Pay could not be verified in the current Sandbox environment.

## Repository

Source code: https://github.com/kyallxiao/checkout-demo
