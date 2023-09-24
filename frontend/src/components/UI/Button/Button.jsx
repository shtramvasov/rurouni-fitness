import classnames from 'classnames'
import Loader from '@components/UI/Loader/Loader'
import styles from './button.module.scss'

function Button({
	children,
	className,
	green,
	blue,
	circle,
	large,
	wide,
	responsive,
	loading,
  ...rest
}) {
  return (
    <button
			disabled={loading}
			className={classnames(styles.button, className, {
				[styles.green]: green,
				[styles.blue]: blue,
				[styles.circle]: circle,
				[styles.large]: large,
				[styles.wide]: wide,
				[styles.responsive]: responsive,
			})}
			{...rest}
		>
			{loading && <Loader className={styles.loader} centered small white />}
			<span
				className={classnames(styles.children, {
					[styles.children__hidden]: loading,
				})}
			>
				{children}
			</span>
		</button>
  )
}

export default Button