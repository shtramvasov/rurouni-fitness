import NavigationLink from '@components/Layout/NavigationLink/NavigationLink'
import styles from './navigation.module.scss'

function Navigation({ links }) {
  return (
    <nav className={styles.navigation}>
			{links.map(link => (
				<NavigationLink link={link} key={link.link} />
			))}
		</nav>
  )
}

export default Navigation