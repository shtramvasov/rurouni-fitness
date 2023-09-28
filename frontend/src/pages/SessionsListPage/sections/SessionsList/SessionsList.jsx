import { useEffect, useState } from 'react'
import SessionBadge from '@components/SessionBadge/SessionBadge'
import SessionCard from '@components/SessionCard/SessionCard'
import Message from '@components/Message/Message'
import { Heading, Loader } from '@components/UI'
import styles from './sessions-list.module.scss'
import { useGetSessionsQuery, useGetOneSessionQuery } from '@store/slices/sessionsSlice'

function SessionsList() {
  const [list, setList] = useState()
  const [activeId, setActiveId] = useState('')
  const { data: sessions, isSuccess } = useGetSessionsQuery()
  const { data: exercises } = useGetOneSessionQuery(activeId);


  useEffect(() => {
		isSuccess && setActiveId(sessions[0].session_id)
	}, [sessions])


  useEffect(() => {
    exercises && setList(exercises)
  }, [exercises]);


  return (
    <>
			{isSuccess ? (
				<section className={styles.sessionsList}>
					<ul className={styles.list}>
						{sessions?.map(session => (
							<SessionBadge
								active={activeId == session.session_id}
								key={session.session_id}
								session={session}
								handler={setList}
								setActive={setActiveId}
							/>
						))}
					</ul>
					<Heading size='small' uppercase>
						Проведенные упражнения
					</Heading>
					<div className={styles.view}>
						{list ? (
							list.map((item, index) => (
								<SessionCard order={index + 1} key={item.session_id} item={item} />
							))
						) : (
							<Message message='Для кардио статистика не ведется' />
						)}
					</div>
				</section>
			) : (
				<Loader centered />
			)}
		</>
  )
}

export default SessionsList