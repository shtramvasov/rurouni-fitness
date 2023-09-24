import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from "@store/slices/userSlice";
import '@assets/styles/globals.scss'

function App() {
  const dispatch = useDispatch();
  const { isLoaded } = useSelector(state => state.userSlice)

  if(!isLoaded) dispatch(checkAuth());

  return (
    <>
     {isLoaded && (<RouterProvider router={router} />)}
    </>
  )
}

export default App
