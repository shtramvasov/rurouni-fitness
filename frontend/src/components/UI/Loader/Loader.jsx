import classnames from 'classnames'
import { BiLoaderAlt } from 'react-icons/bi'
import styles from './loader.module.scss'

function Loader({ small, centered, className, blue, white }) {
  return (
    <BiLoaderAlt
			className={classnames(styles.loader, className, {
				[styles.small]: small,
				[styles.centered]: centered,
				[styles.blue]: blue,
				[styles.white]: white,
			})}
		/>
  )
}

export default Loader