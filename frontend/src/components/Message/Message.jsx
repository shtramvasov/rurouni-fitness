import { Heading } from '@components/UI'
import cup from '@assets/images/cup.png'
import styles from './message.module.scss'

function Message({ message }) {
  return (
    <div className={styles.message}>
			<img className={styles.image} src={cup} alt='Error' />
			<Heading bold centered size='small'>
				{message}
			</Heading>
		</div>
  )
}

export default Message