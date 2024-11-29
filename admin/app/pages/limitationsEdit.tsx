import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { Slots } from '@app/lib/layout'

export default () => {
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						Limitation edit 🚫
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
				</div>
			</Binding>
		</>
	)
}
