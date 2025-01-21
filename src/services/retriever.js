import { request } from "./util/fetch"

const url = import.meta.env.VITE_BACKEND_URL

export async function getEntries() {
	const response = await request(url + "/entries")

	if (response.error) {
		console.error("Retriever failed to retrieve entries.", response)
		console.log("Using backup data if the device has them.")
		return {
			message: "Application is unable to retrieve entries. Please try again later.",
			details: "The issue may fix itself by refreshing the apge. If refreshing doesn't fix the issue, it's probably an internal backend issue."
		}
	}

	return response.body
}

export async function getEntryStructure() {
	const response = await request(url + "/entry-structure")

	if (response.error) {
		console.error("Retriever failed to retrieve entry structure.", response)
		return null
	}

	return response.body
}