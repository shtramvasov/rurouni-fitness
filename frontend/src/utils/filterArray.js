export const filterArray = (array, filter) => {
  if (array != undefined) {
		return array.filter(
			item =>
				item.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
				item.muscle_group?.toLocaleLowerCase().includes(filter.toLocaleLowerCase()),
		)
	}
	return []
}