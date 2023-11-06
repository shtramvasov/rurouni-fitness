import { useState } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom'
import { loginUser, registerUser, setUser } from '@store/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Heading, Input } from '@components/UI'
import Logo from '@components/Logo/Logo'
import { toast } from 'react-toastify';
import { LoadingStatus } from '@constants/LoadingStatus'
import styles from './login-page.module.scss'

function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isRegister, setIsRegister] = useState(false);

  const { loadingStatus } = useSelector((state) => state.userSlice);

  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    const responce = isRegister ? await dispatch(registerUser(data)) : await dispatch(loginUser(data));

    if(responce.payload.error) {
      toast.error(responce.payload.error)
      return;
    }
      
    if(isRegister) {
      setIsRegister(false)
      toast.success('Спасибо за регистрацию')
      return;
    }

    setUser({ user_id: responce.payload.user_id, username: responce.payload.username })
    navigate('/')
    toast.success('Добро пожаловать')
  }

  return (
    <main className={styles.wrapper}>
      <section className={styles.container}>
        <div className={styles.heading}>
          <Logo />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Heading className='md:mb-2' bold size='small'>{isRegister ? 'Зарегистрироваться' : 'Войти в приложение'}</Heading>
          <Input responsive outlined placeholder='Имя'
            error={errors.username}
            {...register('username', { 
              required: 'Введите имя пользователя', 
              minLength:  { value: 5, message: 'Имя пользователя не менее 5 симолов' }
            })} 
            />
          <Input responsive outlined placeholder='Пароль'
            error={errors.password}
            {...register('password', { 
              required: 'Введите пароль', 
              minLength:  { value: 6, message: 'Пароль не менее 6 симолов' }
            })} 
          />
          <Button responsive wide blue
            className='w-full mt-8 md:mt-12' 
            loading={loadingStatus === LoadingStatus.PENDING} >
              {isRegister ? 'Создать аккаунт' : 'Войти'}
            </Button>       
        </form>
        {isRegister ? (
          <p>Уже зарегистрированы? 
          <span onClick={() => setIsRegister(false)} className='text-blue-primary cursor-pointer pl-2'>Войти в приложение</span></p>
        ) : (
          <p>Нет аккаунта? 
          <span onClick={() => setIsRegister(true)} className='text-blue-primary cursor-pointer pl-2'>Зарегистрироваться</span></p>
        )}
      </section>
    </main>
  )
}
export default LoginPage