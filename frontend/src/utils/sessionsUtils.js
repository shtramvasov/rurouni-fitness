export const reduceTrainings = (array, category) => {
	if (array != undefined) {
		const result = array.reduce(
			(acc, current) => (Number(current.category) === Number(category) ? acc + 1 : acc),
			0,
		)
		return result
	}
	return 0
}

export const recordsProgress = (array) => {
	if (array != undefined) {
		return Math.ceil((array.length / 313) * 100) + ' %'
	}
	return 0 + ' %'
}

export const countTotalCalories = (array) => {
	if (array != undefined) {
		const result = array.reduce((acc, current) => acc + Number(current.burned_calories), 0)
		return result
	}
	return 0
}

export const calculateCalories = (exercise,perRep) => {
	return Math.ceil(
		exercise.reps * perRep * exercise.sets + exercise.weight * 0.15,
	)
}