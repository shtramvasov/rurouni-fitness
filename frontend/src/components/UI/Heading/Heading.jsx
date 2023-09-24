import classnames from 'classnames'
import styles from './heading.module.scss'

function Heading({
	children,
	size,
	className,
	uppercase,
	centered,
	bold,
}) {
  const Heading = size === 'leading' ? 'h1' : size === 'small' ? 'h3' : 'h2'

  return (
    <Heading
			className={classnames(styles.heading, className, {
				[styles.uppercase]: uppercase,
				[styles.centered]: centered,
				[styles.bold]: bold,
			})}
		>
			{children}
		</Heading>
  )
}

export default Heading