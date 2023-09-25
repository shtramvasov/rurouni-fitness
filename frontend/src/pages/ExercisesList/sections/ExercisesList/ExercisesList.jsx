import ExerciseCard from '@components/ExerciseCard/ExerciseCard'
import { Loader } from '@components/UI'
import { filterArray } from '@utils/filterArray'
import styles from './exercises-list.module.scss'
import { useGetExercisesQuery } from '@store/slices/exercisesSlice'


function ExercisesList({ filter }) {
  const { data, isLoading } = useGetExercisesQuery()
  const filteredData = filterArray(data, filter)

  return (
    <section className={styles.exercisesList}>
			{isLoading ? (
				<Loader centered />
			) : (
				filteredData.map(exercise => (
					<ExerciseCard key={exercise.exercise_id} data={exercise} />
				))
			)}
		</section>
  )
}

export default ExercisesList