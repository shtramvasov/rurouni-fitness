import { localeDate } from "./convertDates"

export const getWeights = (number, units) => {
	if (number != undefined) {
		return `${number} ${units}`
	}
	return 0
}

export const countWorkouts = (array) => {
	if (array != undefined) {
		return array.length
	}
	return 0
}

export const parseHistory = (array) => {
	if (array != undefined) {
		return array.map(item => ({
			weight: Number(item.weight),
			date: localeDate(item.date),
		}))
	}
	return []
}