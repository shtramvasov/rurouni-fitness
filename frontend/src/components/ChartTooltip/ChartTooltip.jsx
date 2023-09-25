import styles from './chart-tooltip.module.scss'

function ChartTooltip({ active, payload }) {
  if (active && payload && payload.length) {
		return (
			<div className={styles.chartTooltip}>
				<p>Вес на момент тренировки:</p>
				<span>{payload[0].value}</span>
			</div>
		)
	}
	return null
}

export default ChartTooltip