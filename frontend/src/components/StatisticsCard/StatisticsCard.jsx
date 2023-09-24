import styles from './statistics-card.module.scss'

function StatisticsCard({ image, title, value }) {
  return (
    <div className={styles.card}>
			<img src={image} alt={title} className={styles.image}/>
			<div className={styles.description}>
				<p>{title}</p>
				<span>{value}</span>
			</div>
		</div>
  )
}

export default StatisticsCard