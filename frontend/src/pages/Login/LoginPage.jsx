import { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '@components/Layout/Layout'
import { setUser } from '@store/slices/userSlice'
import { useDispatch } from 'react-redux'
import axios from '@utils/fetch';

function LoginPage() {
  const dispatch = useDispatch()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.post('/auth/login', {
      username: username,
      password: password,
    });
    const result = response.data;

    dispatch(setUser({user: result.user, isAuth: result.isAuth}))
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <input onChange={(e) => setUsername(e.target.value)} type="text" />
        <input onChange={(e) => setPassword(e.target.value)} type="text" />
        <button>Отправить</button>
      </form>
      <Link to='/'>На главную</Link>
    </Layout>   
  )
}
export default LoginPage