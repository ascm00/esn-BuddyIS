import { useEntity, usePersist, Field, Component, useRedirect, HasOne, EntityAccessor } from "@contember/interface"
import { Button } from "../ui/button"
import { createPayment } from "../payment/comgate"

export const AddToRegisteredUsersButton = Component(
	() => {
		const entity = useEntity()
		const persist = usePersist()
        const redirect = useRedirect()
		const isWaitingList = entity.getField('isWaitingList')
		const paymentStatus = entity.getField('payment')
        const eventId = entity.getField('event.id').value

		function addToRegisteredUsers(){
			isWaitingList.updateValue(false)
			paymentStatus.updateValue('unpaid')
			persist()
            window.location.reload()
            
		}

		return (
			<Button variant={'default'} size={'sm'} onClick={() => addToRegisteredUsers()}>Add to registered users</Button>
		)
	}, ()=>(
		<>
			<Field field={'isWaitingList'} />
            <Field field={'event.id'} />
			<Field field={'payment'} />
		</>
	)
)

type PaymentButtonProps = {
    registration: EntityAccessor | null
}

export const PaymentButton = Component<PaymentButtonProps>(
	(props) => {

        return (
            <Button onClick={async () => {
                if (props.registration !== null) {
                    await createPayment(props.registration)
                }
            }}>
                Pay
            </Button>
        )

})