// export type ComgateCreatePaymentResult = {
// 	code: string;
// 	message: string;
// 	transId?: string;
// 	redirect?: string;
// };

import { EntityAccessor, Environment, useRedirect } from "@contember/interface";

// export const createPayment = async () => {
// 	// pro testování - třeba pak dát do .env
// 	const merchantId = 'G1039332';
// 	const price = '1';
// 	const orderNumber = '1';
// 	const orderId = '8778767';

// 	try {
// 		const response = await fetch('https://payments.comgate.cz/v1.0/create', {
// 			method: 'POST',
// 			mode: 'no-cors',
// 			headers: {
// 				'Content-Type': 'application/x-www-form-urlencoded',
// 				'Accept': 'application/x-www-form-urlencoded',
// 				'Authorization': 'Basic REMOVED_TOKEN',
// 			},
// 			body: new URLSearchParams({
// 				merchant: merchantId,
// 				test: 'true',
// 				price: price,
// 				curr: 'CZK',
// 				label: orderNumber,
// 				refId: orderId,
// 				method: 'ALL',
// 				fullName: 'Martin Aschermann',
//                 phone: '606185858',
// 				email: 'martin.aschermann2@gmail.com',
// 				lang: 'cs',
// 				prepareOnly: 'true',
// 				secret: 'REMOVED_TOKEN',
// 			}),
// 		});

// 		console.log(response);

// 		if (response.ok) {

// 			console.log('Payment created successfully:');
// 		} else {
// 			console.error('Payment creation failed:', response.statusText);
// 		}
// 	} catch (error) {
// 		console.error('Error creating payment:', error);
// 	}
// };

// export type ComgateCreatePaymentResult = {
// 	code: string;
// 	message: string;
// 	transId?: string;
// 	redirect?: string;
// };

// export const createPayment = async () => {
// 	// pro testování - potřeba pak dát do .env
// 	const merchantId = 'REMOVED_TOKEN';
// 	const price = '1';
// 	const orderNumber = '1';
// 	const orderId = '8778767';

// 	try {
// 		const response = await fetch('https://payments.comgate.cz/v2.0/payment.json', {
// 			method: 'POST',
// 			mode: 'no-cors',
// 			headers: {
// 				'Content-Type': 'application/x-www-form-urlencoded',
// 				'charset': 'utf-8',
// 				'accpet': 'application/x-www-form-urlencoded',
// 				'Authorization': 'Basic REMOVED_TOKEN',
				
// 			},
// 			body: new URLSearchParams({
// 				preauth: 'true',
// 				merchant: merchantId,
// 				test: 'true',
// 				price: price,
// 				curr: 'CZK',
// 				label: orderNumber,
// 				refId: orderId,
// 				method: 'ALL',
// 				fullName: 'Martin Aschermann',
//                 phone: '606185858',
// 				email: 'martin.aschermann2@gmail.com',
// 				lang: 'cs',
// 				prepareOnly: 'true',
// 				secret: 'REMOVED_TOKEN'
// 			}),
// 		});

// 		console.log(response);

// 		if (response.ok) {

// 			console.log('Payment created successfully:');
// 		} else {
// 			console.error('Payment creation failed:', response.statusText);
// 		}
// 	} catch (error) {
// 		console.error('Error creating payment:', error);
// 	}
// };

export type ComgateCreatePaymentResult = {
	code: string
	message: string
	transId?: string
	redirect?: string
}

export const createPayment = async (registration: EntityAccessor) => {
    const merchantId = 'REMOVED_TOKEN'
    const secret = 'REMOVED_TOKEN'
    const price = registration.getEntity('event').getField<number>('fee').value ?? 0
	const email = registration.getEntity('person.tenantPerson').getField<string>('email').value ?? ''
	const firstName = registration.getEntity('person').getField<string>('firstName').value ?? ''
	const surname = registration.getEntity('person').getField<string>('surname').value ?? ''
	const name = firstName + ' ' + surname
	const stringPrice = (price * 100).toString()
	const id = registration.getField('id').value?.toString() ?? ''
	console.log(id)
	console.log(price)


    try {
        const response = await fetch('https://payments.comgate.cz/v1.0/create', {
            method: 'POST',
			mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            },
            body: new URLSearchParams({
				merchant: merchantId,
				test: '1',
                price: stringPrice,
                curr: 'CZK',
                label: id,
                refId: id,
                method: 'ALL', // Umožňuje všechny platební metody
                fullName: name, // Jméno zákazníka
                email: email,
                lang: 'en',
                prepareOnly: 'true',
                secret: secret,
            }),
        });

		console.log('response:',response)

        if (response.ok) {
            const result = await response.json() as ComgateCreatePaymentResult
			// redirect(result.redirect ?? '')

            console.log('Platební brána úspěšně vytvořena:', result);
			
        } else {
            console.error('Chyba při vytváření platby:', response.statusText);
        }
    } catch (error) {
        console.error('Chyba při vytváření platby:', error);
    }
};



