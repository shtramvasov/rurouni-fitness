import { Heading, Input } from '@components/UI'
import styles from './search.module.scss'

function Search({ search, title }) {
  return (
    <div className={styles.search}>
			{title && (
				<Heading size='small' uppercase>
					{title}
				</Heading>
			)}
			<Input
				onChange={e => search(e.target.value)}
				secondary
				responsive
				placeholder='Искать упражнение ...'
			/>
		</div>
  )
}

export default Search