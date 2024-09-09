export const validateEmail = (email: string | undefined) => {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (email && re.test(String(email).toLowerCase())) {
		return { ok: true }
	}

	return { ok: false, errorMessage: 'Incorrect e-mail format' }
}