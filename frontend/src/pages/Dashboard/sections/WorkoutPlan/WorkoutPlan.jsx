import RoutineCard from '@components/RoutineCard/RoutineCard'
import { Heading } from '@components/UI'
import styles from './workout-plan.module.scss'
import { useGetActiveRoutinesQuery } from '@store/slices/routinesSlice'


function WorkoutPlan() {
  const { data } = useGetActiveRoutinesQuery();

  return (
    <section className={styles.workoutPlan}>
			<Heading className='text-black-light' size='small' uppercase>
				Программа тренировок
			</Heading>
			<section className={styles.container}>
				{data?.map(item => (
					<RoutineCard key={item.routine_id} data={item} />
				))}
			</section>
		</section>
  )
}

export default WorkoutPlan