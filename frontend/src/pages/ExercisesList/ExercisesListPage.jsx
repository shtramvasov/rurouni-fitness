import { useState } from 'react'
import { ExercisesList } from './sections'
import Layout from '@components/Layout/Layout'
import Search from '@components/Search/Search'


function ExercisesListPage() {
  const [search, setSearch] = useState('')

  return (
    <Layout>
      <Search title='Список всех упражнений' search={setSearch} />
      <ExercisesList filter={search} />
    </Layout>
  )
}

export default ExercisesListPage