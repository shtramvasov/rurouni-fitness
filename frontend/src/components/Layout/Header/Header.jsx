import { NavLink } from 'react-router-dom'
import { HiViewGridAdd } from 'react-icons/hi'
import { NavigationData as links } from '@components/Layout/Navigation/navigation.data'
import Navigation from '@components/Layout/Navigation/Navigation'
import Logo from '@components/Logo/Logo'
import { Button } from '@components/UI'
import styles from './header.module.scss'



function Header() {
  return (
    <header className={styles.header}>
      <Logo />
      <Navigation links={links} />
      <NavLink className='responsive' to='/admin'>
        <Button blue responsive>
					<HiViewGridAdd /> Записать тренировку
				</Button>
			</NavLink>
    </header>
  )
}

export default Header