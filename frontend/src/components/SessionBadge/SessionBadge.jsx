import classnames from 'classnames'
import styles from './session-badge.module.scss'
import { localeDate } from '@utils/convertDates'

function SessionBadge({ session, handler, active, setActive }) {
  return (
    <li
			className={classnames(styles.badgeSession, {
				[styles.badgeActive]: active,
			})}
			key={session.session_id}
			onClick={() => {
				handler(session.exercises)
				setActive(session.session_id)
			}}
		>
			<b>{session.name}</b>
			<p className={styles.desc}>{localeDate(session.created_on_tz)}</p>
		</li>
  )
}

export default SessionBadge