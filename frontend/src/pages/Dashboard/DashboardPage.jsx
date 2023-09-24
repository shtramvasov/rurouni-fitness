import { useGetExercisesQuery } from '@store/slices/exercisesSlice'
import React from 'react'
import { Link } from 'react-router-dom'
function Dashboard() {
  const { data } = useGetExercisesQuery();
  return (
    <>
    <div>Dashboard</div>
    <Link to='/login'>Логин</Link>
  </> 
  )
}

export default Dashboard