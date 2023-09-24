import calendar from '@assets/images/calendar.png'
import calories from '@assets/images/calories.png'
import cardio from '@assets/images/cardio.png'
import weights from '@assets/images/weights.png'
import { reduceTrainings, countTotalCalories, recordsProgress } from '@utils/sessionsUtils'

export const getSessionsData = (sessions) => [
  {
		image: weights,
		title: 'Силовых тренировок',
		value: reduceTrainings(sessions, 1),
	},
	{
		image: cardio,
		title: 'Кардио тренировок',
		value: reduceTrainings(sessions, 2),
	},
	{
		image: calendar,
		title: 'Общий прогресс',
		value: recordsProgress(sessions),
	},
	{
		image: calories,
		title: 'Всего калорий сгорело',
		value: countTotalCalories(sessions),
	},
]