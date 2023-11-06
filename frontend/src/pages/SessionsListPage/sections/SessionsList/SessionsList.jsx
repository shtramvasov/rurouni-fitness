import { useEffect, useState } from 'react'
import SessionBadge from '@components/SessionBadge/SessionBadge'
import SessionCard from '@components/SessionCard/SessionCard'
import Message from '@components/Message/Message'
import { Heading, Loader } from '@components/UI'
import { useGetSessionsQuery, useGetOneSessionQuery } from '@store/slices/sessionsSlice'
import { RiAlarmWarningLine } from 'react-icons/ri'
import styles from './sessions-list.module.scss'

function SessionsList() {
  const [list, setList] = useState()
  const [activeId, setActiveId] = useState('')
  const { data: sessions, isSuccess } = useGetSessionsQuery()
  const { data: exercises } = useGetOneSessionQuery(activeId);


  useEffect(() => {
		isSuccess && sessions.length && setActiveId(sessions[0].session_id)
	}, [sessions])


  useEffect(() => {
    exercises && setList(exercises)
  }, [exercises]);


  return (
    <>
			{isSuccess ? (
				<section className={styles.sessionsList}>
          {sessions.length ? (
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
          ) : null}
					<Heading size='small' uppercase>
						Проведенные упражнения
					</Heading>
          {sessions.length ? (

					<div className={styles.view}>
						{list ? (
							list.map((item, index) => (
								<SessionCard order={index + 1} key={item.session_id} item={item} />
							))
						) : (
							<Message message='Для кардио статистика не ведется' />
						)}
					</div>
          ) : (
            <div className={styles.alert}>
              <RiAlarmWarningLine className='text-[1.8rem] text-yellow-dark'/>
              <p>У вас ещё нет проведенных тренировок</p>
            </div>
          )}
				</section>
			) : (
				<Loader centered />
			)}
		</>
  )
}

export default SessionsList