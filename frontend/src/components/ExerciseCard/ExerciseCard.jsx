import { Link } from 'react-router-dom'
import { HiChevronRight } from 'react-icons/hi'
import { Heading } from '@components/UI'
import styles from './exercise-card.module.scss'


function ExerciseCard({ data }) {
  return (
    <Link to={`/exercises/${data.exercise_id}`} className={styles.card}>
      <Heading size='small' bold centered>
        {data.name}
      </Heading>
      <span>
        Упражнение на <HiChevronRight className={styles.icon} />{' '}
        <b>{data.muscle_group}</b>
      </span>
    </Link>
  )
}

export default ExerciseCard