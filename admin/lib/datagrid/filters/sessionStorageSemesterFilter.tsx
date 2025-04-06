import { Binding } from "@app/lib/binding"
import { Component, EntityListSubTree, Field, useEntityListSubTree } from "@contember/interface"

export const SetCurrentSemesterByDefault = Component(({keyParam} : {keyParam: string}) => {

	const semesters = Array.from(useEntityListSubTree('currentSemester'))
	let currentSemesterId = ""
	semesters.forEach(semester => {
		if(semester.getField<boolean>('isCurrent').value === true) {
			currentSemesterId = semester.getField<string>('id').value ?? ""
		}
	})

	if(currentSemesterId){
        if (!sessionStorage.getItem(keyParam) || sessionStorage.getItem(keyParam) === `{"semester":{"id":[]}}`) {
            sessionStorage.setItem(keyParam, `{"semester":{"id":["${currentSemesterId}"]}}`)
        }
	}

	return (
		<div />
	)
}, () => (
	<Binding>
		<EntityListSubTree
			entities={`Semester[isCurrent=true]`}
			alias={'currentSemester'}
		>
			<Field field={'isCurrent'} />
			<Field field="id" />
		</EntityListSubTree>
	</Binding>
))