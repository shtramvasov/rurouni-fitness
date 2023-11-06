import Layout from '@components/Layout/Layout'
import Statistics from '@components/Statistics/Statistics'
import { Loader } from '@components/UI'
import { CalendarHeatmap, WorkoutPlan } from './sections'
import { getSessionsData } from './statistics.data'
import { useGetSessionsQuery } from '@store/slices/sessionsSlice'


function DashboardPage() {
  const { data: sessions, isLoading, error  } = useGetSessionsQuery()
  const data = getSessionsData(sessions)

  return (
    <Layout>
      <Statistics data={data} title='Информация о тренировках' />
      { isLoading ? <Loader centered /> : <CalendarHeatmap data={sessions} /> }
      <WorkoutPlan />
    </Layout>
  )
}

export default DashboardPage