import { EntityAccessor, Environment, useRedirect } from "@contember/interface";

export type ComgateCreatePaymentResult = {
	code: string;
	message: string;
	transId?: string;
	redirectUrl?: string;
};

//I set up a new API Gateway endpoint in AWS that will call the Comgate API and return the response to the client.

export const createPayment = async (registration: EntityAccessor) => {

  // zatím nefunguje import.meta.env.BASE_URL, proto
  const start = 'https://esn-buddy-is.eu.contember.cloud'

  const url_paid = start + '/app/registration-payment-successful?id=' + registration.getField('event.id').value?.toString()
  const url_cancelled = start + '/registration-payment-unsuccessful?id=' + registration.getField('event.id').value?.toString()
  const url_pending = start + '/registration-payment-pending?id=' + registration.getField('event.id').value?.toString()
  const price1 = registration.getEntity('event').getField<number>('fee').value
  let price : number = 0
  if(price1){
    price = price1 * 100
  }
    
    const data = {
        test: '1', // testing mode on
        email: registration.getEntity('person.tenantPerson').getField<string>('email').value,
        price: price.toString(),
        curr: 'CZK',
        label: registration.getField('id').value?.toString(),
        refId: registration.getField('id').value?.toString(),
        fullName: registration.getEntity('person').getField<string>('firstName').value ?? '' + ' ' + registration.getEntity('person').getField<string>('surname').value,
        phoneNumber: registration.getEntity('person').getField<string>('phoneNumber').value,
        url_paid: url_paid,
        url_cancelled: url_cancelled,
        url_pending: url_pending,
    }

    const checkStatusData = {
      id: registration.getField('id').value?.toString()
  }

      
    // web services API
    const apiUrl = 'https://t795yjlr41.execute-api.eu-north-1.amazonaws.com/testing_stage/create-payment';
    const checkStatusUrl = 'https://t795yjlr41.execute-api.eu-north-1.amazonaws.com/testing_stage/payment-status'
  
  if(data.test && data.email && data.price && data.curr && data.label && data.refId && data.fullName && data.phoneNumber && data.url_paid && data.url_cancelled && data.url_pending) {
    try {

      await fetch(checkStatusUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkStatusData),
      });

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log(response);

      if (response.ok) {
        const result = await response.json();

        const parsedBody: ComgateCreatePaymentResult = JSON.parse(result.body);

        // Extract the redirectUrl and redirect the user
        if (parsedBody.redirectUrl) {
          window.location.href = parsedBody.redirectUrl;
        } else {
          console.error('Redirect URL not found in the response.');
        }
      } else {
        console.error('Error in the payment request:', await response.text());
      }
    } catch (error) {
      console.error('Error calling Cloudflare Worker:', error);
      throw error;
    }
  } else {
    throw new Error('Missing required data for the payment request. Please check the data.');
  }
};


