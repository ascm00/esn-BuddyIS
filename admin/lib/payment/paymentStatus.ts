import { EntityAccessor, Environment, useRedirect } from "@contember/interface";
import { ComgateCreatePaymentResult } from "./comgate";

//I set up a new API Gateway endpoint in AWS that will check whether user paid after certain time

export const checkPaymentStatus = async (registration: EntityAccessor) => {

    const apiUrl = 'https://t795yjlr41.execute-api.eu-north-1.amazonaws.com/testing_stage/payment-status'
    const registrationId = registration.getField('id').value

    const data = {
        "id": registrationId
    }
  
    if(registrationId) {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json()
            return result
        } catch (error) {
            console.error('Error calling AWS API Gateway', error)
            throw error
        }

    }

    return null
}


