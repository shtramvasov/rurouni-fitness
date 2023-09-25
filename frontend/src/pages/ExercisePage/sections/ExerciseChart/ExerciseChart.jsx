import {
	ResponsiveContainer,
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
} from 'recharts'
import ChartTooltip from '@components/ChartTooltip/ChartTooltip'
import { Heading, Loader } from '@components/UI'
import { configuration } from './chart.data'
import { parseHistory } from '@utils/exerciseUtils'
import styles from './exercise-chart.module.scss'


function ExerciseChart({ data, name }) {
  const exercise = parseHistory(data)

  return (
    <section className={styles.wrapper}>
			<Heading size='small' uppercase>
				<b className='text-black-light'>{name}</b> — Изменение веса
			</Heading>
			{data ? (
				<div className={styles.chart}>
					<ResponsiveContainer height={450}>
						<LineChart data={exercise} {...configuration.lineChart}>
							<CartesianGrid {...configuration.grid} />
							<XAxis {...configuration.XAxis} />
							<YAxis type='number' {...configuration.YAxis} />
							<Tooltip content={<ChartTooltip active payload />} />
							<Line type='monotone' {...configuration.line} />
						</LineChart>
					</ResponsiveContainer>
				</div>
			) : (
				<Loader centered />
			)}
		</section>
  )
}

export default ExerciseChart