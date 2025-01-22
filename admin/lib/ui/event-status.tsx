import { Component } from "@contember/interface"
import { useEntity } from "@contember/interface"
import { Field } from "@contember/interface"

export const PlacesLeftField = Component(
	() => {
		const entity = useEntity()
		const participantCount = entity.getField<number>('registeredCount.registered_count').value ?? 0
		const capacity = entity.getField<number>('capacity').value ?? 0
		const placesLeft = capacity - participantCount
		
		if(placesLeft < 1){
			return(<>0 places</>)
		} else if(placesLeft >= 1){
			return(<>{placesLeft} places</>)
		}
	}, () => (
		<>
			<Field field="registeredCount.registered_count" />
			<Field field={'capacity'} />
		</>
	)
)

export const PlacesLeftTag = Component(
	() => {
		const entity = useEntity()
		const participantCount = entity.getField<number>('registeredCount.registered_count').value ?? 0
		const capacity = entity.getField<number>('capacity').value ?? 0
		const placesLeft = capacity - participantCount
		
		if (placesLeft < 1) {
			return (
				<div className="bg-red-100 mt-1 text-red-700 px-3 py-1 rounded text-sm font-semibold">
					Obsazeno
				</div>
			)
		} else if(placesLeft >= 1 && placesLeft < 10){
            return (
				<div className="bg-orange-100 mt-1 text-orange-700 px-3 py-1 rounded text-sm font-semibold">
					{placesLeft} places left
				</div>
			)
        } else if(placesLeft >= 10 && placesLeft <= 15){
            return (
				<div className="bg-yellow-100 mt-1 text-yellow-700 px-3 py-1 rounded text-sm font-semibold">
						{placesLeft} places left
				</div>
			)
        } else {
			return (
				<div className="bg-green-100 mt-1 text-green-700 px-3 py-1 rounded text-sm font-semibold">
					More than 15 places left
				</div>
			)
		}
	}, () => (
		<>
			<Field field="registeredCount.registered_count" />
			<Field field={'capacity'} />
		</>
	)
)

