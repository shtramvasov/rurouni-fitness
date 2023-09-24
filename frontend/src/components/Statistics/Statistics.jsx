import StatisticsCard from '@components/StatisticsCard/StatisticsCard'
import { Heading } from '@components/UI'
import styles from './statistics.module.scss'

function Statistics({ data, title }) {
  return (
    <section className={styles.wrapper}>
			{title && (
				<Heading className='text-black-light' size='small' uppercase>
					{title}
				</Heading>
			)}
			<section className={styles.statistics}>
				{data.map(item => (
					<StatisticsCard
						key={item.title}
						image={item.image}
						title={item.title}
						value={item.value}
					/>
				))}
			</section>
		</section>
  )
}

export default Statistics