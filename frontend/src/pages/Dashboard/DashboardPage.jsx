import Layout from '@components/Layout/Layout'
import Statistics from '@components/Statistics/Statistics'
import { Loader } from '@components/UI'
import { getSessionsData } from './statistics.data'
import { useGetSessionsQuery } from '@store/slices/sessionsSlice'


function DashboardPage() {
  const { data: sessions, isLoading } = useGetSessionsQuery()
  const data = getSessionsData(sessions)

  return (
    <Layout>
      <Statistics data={data} title='Информация о тренировках' />
    </Layout>
  )
}

export default DashboardPage