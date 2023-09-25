import { getWeights , countWorkouts} from '@utils/exerciseUtils'
import calories from '@assets/images/calories.png'
import notification from '@assets/images/notification.png'
import record from '@assets/images/record.png'
import weights from '@assets/images/weights.png'

export const getExerciseData = (exercise) => [
  {
		image: weights,
		title: 'Текущий вес',
		value: getWeights(exercise?.weight, exercise?.units),
	},
	{
		image: record,
		title: 'Личный рекорд',
		value: getWeights(exercise?.personal_record, exercise?.units),
	},
	{
		image: notification,
		title: 'Всего тренировок',
		value: countWorkouts(exercise?.history),
	},
	{
		image: calories,
		title: 'Калорий сгорело',
		value: exercise?.total_calories ?? 0,
	},
]