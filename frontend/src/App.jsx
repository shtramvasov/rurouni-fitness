import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { checkAuth } from "@store/slices/userSlice";
import '@assets/styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const dispatch = useDispatch();
  const { isLoaded, isAuth } = useSelector(state => state.userSlice);

  useEffect(() => {
    if(!isAuth && router.state.location.pathname !== '/login') {
      dispatch(checkAuth())
    }
  }, [isAuth])

  return (
    <>
    {(isLoaded || router.state.location.pathname === '/login') && <RouterProvider router={router} />}
    <ToastContainer 
      autoClose={1500}
      position='bottom-center'
      hideProgressBar
      newestOnTop
      theme='colored'
      pauseOnFocusLoss={false}
    />
    </>
  )
}

export default App
