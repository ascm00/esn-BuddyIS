## Payments (Comgate)

The system integrates with Comgate via AWS API Gateway endpoints. Users can pay event registration fees and the system checks payment status.

### Key Files

- Create payment request: `admin/lib/payment/comgate.ts`
- Check payment status: `admin/lib/payment/paymentStatus.ts`
- UI integrations: payment button in event detail (`AddToRegisteredUsersButton`, `PaymentButton` components) and registration detail fields.

### Create Payment Flow

Function: `createPayment(registration: EntityAccessor)`

1) Compute return URLs from `VITE_APP_URL`:
   - `/registration-payment-successful?id=<eventId>`
   - `/registration-payment-unsuccessful?id=<eventId>`
   - `/registration-payment-pending?id=<eventId>`
2) Build payload from registration and event:
   - Email, price (event `fee * 100`), currency, label/refId as registration id, full name, phone number, and the three return URLs.
3) Call a status-precheck endpoint (`VITE_AWS_CHECK_STATUS_URL`) with `{ id }`.
4) Call `VITE_AWS_CREATE_PAYMENT_API_URL` with the payload.
5) Parse JSON body to `ComgateCreatePaymentResult` and redirect browser to `redirectUrl`.

Prerequisites: Ensure `.env` contains `VITE_APP_URL`, `VITE_AWS_CREATE_PAYMENT_API_URL`, and `VITE_AWS_CHECK_STATUS_URL`.

### Status Check Flow

Function: `checkPaymentStatus(registration: EntityAccessor)`

- Sends `{ id: registrationId }` to a hardcoded API Gateway URL `.../payment-status`.
- Returns the JSON status result; callers should interpret and update UI accordingly (e.g., tag rendering via `formatPaymentStatusTag`).

### UI Behavior in Event Detail

- If event is paid and user is accepted but `payment = unpaid`, shows a Payment action to trigger `createPayment`.
- Waiting list users do not get a payment button.

### Operational Notes

- Validate presence of required fields before calling the API; otherwise throws with helpful message.
- Network errors are surfaced to console; consider adding user-facing toasts if needed.


