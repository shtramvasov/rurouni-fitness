import styles from './logo.module.scss'
import logo from '@assets/images/logo-vertical.svg'

function Logo() {
    return <img src={logo} alt='Rurouni Fitness' className={styles.logo} /> 
}

export default Logo