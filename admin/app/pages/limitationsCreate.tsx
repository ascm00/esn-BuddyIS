import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { Slots } from '@app/lib/layout'

export default () => {
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						Limitations create
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
				</div>
			</Binding>
		</>
	)
}
