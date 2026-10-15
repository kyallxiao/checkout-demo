# Checkout.com Sandbox Test Results

## 1. Netherlands — Visa

- **Product:** Classic Clear Case
- **Expected amount:** EUR 15.00
- **API amount:** 1500 (minor units)
- **Payment method:** Card (Visa)
- **3DS:** Completed
- **Final payment status:** Captured
- **HTTP status when retrieving payment:** 200 OK

**Result:** Passed. The retrieved payment amount and currency matched the selected product.

## 2. Hong Kong — Mastercard

- **Product:** Rugged Shield Case
- **Expected amount:** HKD 180.00
- **API amount:** 18000 (minor units)
- **Payment method:** Card (Mastercard)
- **3DS:** No visible 3DS challenge occurred in this test.
- **Final payment status:** Captured
- **Approved:** true

**Result:** Passed. The retrieved payment amount and currency matched the selected product.

## 3. Hong Kong — Google Pay

- **Product:** Classic Clear Case
- **Amount:** HKD 120.00
- **API amount:** 12000 (minor units)
- **Payment method:** Google Pay (`googlepay`)
- **HTTP response:** 200 OK
- **Final payment status:** Captured
- **Approved:** true
- **3DS:** The API response included authentication fields (`enrolled: Y`, `authentication_response: Y`).

**Result:** Passed. The payment completed successfully in the Sandbox environment, and the final payment status was confirmed as Captured.

## Scope and Limitations

- All tests were conducted in Checkout.com Sandbox.
- Card payment results were verified through the retrieved payment details.
- Google Pay payment completion was verified through the API response.
- iDEAL | Wero was accessible in the Flow UI, but payment completion could not be verified due to an “Access Denied” error after selecting ING.
- Apple Pay was considered to address potential customer needs but could not be verified in the current Sandbox environment.
- A successful return-page redirect alone is not evidence of a successful payment.