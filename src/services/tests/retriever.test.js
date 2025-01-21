import { expect, test } from 'vitest'
import { request } from '../util/fetch'

const url = import.meta.env.VITE_BACKEND_URL

test("Backend is reachable", async () => {
	const response = await request(url + "/")
	const failed = await request(url + "/goingToFail")

	expect(typeof response.body).toBe("string")
	expect(failed.error).toBe(true)
})

test("can receive entries", async () => {
	const response = await request(url + "/entries")

	expect(Array.isArray(response.error)).toBe(false)
	expect(Array.isArray(response.body)).toBe(true)
})

test("can receive entry structure", async () => {
	const response = await fetch(url + "/entry-structure")
	const status = response.ok
	const body = await response.json()

	expect(status).toBe(true)
	expect(Array.isArray(body)).toBe(true)
})