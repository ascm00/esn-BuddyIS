export default `mutation($personId: UUID!, $createData: PersonCreateInput!, $updateData: PersonUpdateInput!) {
	createPerson(data: $createData) {
		errorMessage
		errors {
			message
		    type
		}
		ok
	}
}`
