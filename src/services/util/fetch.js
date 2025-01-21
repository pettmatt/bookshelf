export async function request(url) {
	const response = await fetch(url)
	const object = {
		error: false,
		body: null
	}

	if (response.ok) {
		const headerType = response.headers.get("content-type")

		if (headerType?.includes("application/json")) {
			object.body = await response.json()
			return object
		} else {
			object.body = await response.text()
			return object
		}
	}

	object.error = true
	object.body = response

	return object
}