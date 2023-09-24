import { useState } from 'react'
import { setUser } from '@store/slices/userSlice'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
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
    <>
      <div>Login</div>
      <Link to='/'>На главную</Link>

      <form onSubmit={handleSubmit}>
        <input onChange={(e) => setUsername(e.target.value)} type="text" />
        <input onChange={(e) => setPassword(e.target.value)} type="text" />
        <button>Отправить</button>
      </form>
    </>   
  )
}
export default LoginPage