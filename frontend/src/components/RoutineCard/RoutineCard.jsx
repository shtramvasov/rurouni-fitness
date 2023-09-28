import { Link } from 'react-router-dom'
import { Heading } from '@components/UI'
import styles from './routine-card.module.scss'

function RoutineCard({ data }) {
  return (
    <div className={styles.cardRoutine}>
			<Heading size='small' bold>
				{data.name}
			</Heading>
			<ul className={styles.list}>
				{data.exercises.map(exercise => (
					<Link key={exercise.exercise_id} to={`/exercises/${exercise.exercise_id}`}>
						<li>{exercise.exercise_name}</li>
					</Link>
				))}
			</ul>
		</div>
  )
}

export default RoutineCard