export default `mutation($createData: PersonCreateInput!) {
	createPerson(data: $createData) {
		errorMessage
		errors {
			message
		    type
		}
		ok
	}
}`