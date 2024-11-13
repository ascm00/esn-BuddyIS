export default `query($email: String!) {
    listTenantPerson(filter: { email: {eq: $email} }) {
      id
	}
}`
  