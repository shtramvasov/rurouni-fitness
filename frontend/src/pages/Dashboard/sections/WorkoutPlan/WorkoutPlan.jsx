import RoutineCard from '@components/RoutineCard/RoutineCard'
import { Heading } from '@components/UI'
import { useGetActiveRoutinesQuery } from '@store/slices/routinesSlice'
import { useToastHandler } from '@hooks/useToastHandler'
import { RiAlarmWarningLine } from 'react-icons/ri'
import styles from './workout-plan.module.scss'


function WorkoutPlan() {
  const { data, error, isError } = useGetActiveRoutinesQuery();
  useToastHandler(isError, error);
  
  return (
    <section className={styles.workoutPlan}>
			<Heading className='text-black-light' size='small' uppercase>
				Программа тренировок
			</Heading>
      {data?.length ? (
        <section className={styles.container}>
          {data?.map(item => (
            <RoutineCard key={item.routine_id} data={item} />
          ))}
        </section>
      ) : (
        <section className={styles.alert}>
          <RiAlarmWarningLine className='text-[1.8rem] text-yellow-dark'/>
          <p>У вас нет активных тренировочных программ</p>
        </section>
      )}
		</section>
  )
}

export default WorkoutPlan