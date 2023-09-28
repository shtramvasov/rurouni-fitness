import { Heading } from '@components/UI'
import styles from './session-card.module.scss'

function SessionCard({ item, order }) {
  return (
    <div className={styles.cardSession}>
			<Heading bold size='small'>
				<b className={styles.order}>{order}.</b> {item.name}
			</Heading>
			<div className={styles.description}>
				<p className={styles.weight}>
					{item.weight}
					{item.units}
				</p>
				<p>
					{item.reps} x {item.sets}
				</p>
			</div>
		</div>
  )
}

export default SessionCard