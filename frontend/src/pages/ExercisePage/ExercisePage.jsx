import { useParams } from 'react-router-dom'
import Statistics from '@components/Statistics/Statistics'
import { ExerciseChart } from './sections'
import Layout from '@components/Layout/Layout'
import { useGetOneExerciseQuery } from '@store/slices/exercisesSlice'
import { getExerciseData } from './statistics.data'

function ExercisePage() {
  const { exercise_id } = useParams()
  const { data: exercise } = useGetOneExerciseQuery(exercise_id)
  const data = getExerciseData(exercise)

  return (
    <Layout>
      <Statistics data={data} />
      <ExerciseChart  data={exercise?.history} name={exercise?.name} />
    </Layout>
  )
}

export default ExercisePage