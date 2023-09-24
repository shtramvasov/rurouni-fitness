import { NavLink } from 'react-router-dom'
import classnames from 'classnames'
import styles from './navigation-link.module.scss'

function NavigationLink({ link }) {
  return (
    <NavLink
			to={link.link}
			className={({ isActive }) =>
				classnames(styles.link, { active: isActive })
			}
		>
			{<link.icon className={styles.icon} />}
			<span className={styles.title}>{link.title}</span>
		</NavLink>
  )
}

export default NavigationLink