import dayjs from 'dayjs';
import 'dayjs/locale/ru';

export const currentYear = new Date().getFullYear()

export const timestampToDate = (date) => {
	return dayjs(date?.toDate()).format('YYYY-MM-DD')
}


export const localeDate = (date) => {
	if (typeof date === 'string') {
		return dayjs(date)
			.locale('ru')
			.format('D MMMM YYYY')
	}
	return dayjs(date?.toDate()).locale('ru').format('D MMMM YYYY');
}