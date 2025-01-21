function checkCacheAge(cachedEntries) {
	const createdAt = new Date(cachedEntries.status.createdAt)
	const currentDate = new Date()

	// Calculating difference in milliseconds
	const difference = currentDate - createdAt
	const daysOld = difference / (1000 * 60 * 60* 24)
	const isDeterminedToBeOld = import.meta.env.VITE_CACHE_EXPIRATION_DAY || 30

	return (Math.floor(daysOld) > isDeterminedToBeOld) ? true : false
}

export function handleCaching(object, storageName) {
	const cacheObject = {
		status: {
			createdAt: null,
			old: false
		},
		[storageName]: []
	}

	cacheObject[storageName] = object
	cacheObject.status.createdAt = new Date().toISOString()
	const stringified = JSON.stringify(cacheObject)

	localStorage.setItem(storageName, stringified)
}

export function checkCachedObject(storageName) {
	const cachedObject = localStorage.getItem(storageName)
	const object = JSON.parse(cachedObject) || {}

	const isOld = ("status" in object) ? checkCacheAge(object) : true

	// This check can happen when there's no local entries, 
	// which is why the structure might need to be created on the fly.
	if ("status" in object) {
		object.status.old = isOld
	} else {
		object.status = {}
		object.status.old = isOld
	}

	return object
}