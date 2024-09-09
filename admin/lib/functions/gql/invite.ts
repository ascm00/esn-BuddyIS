export default `mutation($email: String!, $projectSlug: String!, $name: String, $memberships: [MembershipInput!]!, $options: InviteOptions) {
  invite(email: $email, projectSlug: $projectSlug, name: $name, memberships: $memberships, options: $options) {
    error {
      code
      developerMessage
      membershipValidation {
        code
        role
        variable
      }
    }
    ok
    result {
      person {
        id
      }
    }
  }
}`
