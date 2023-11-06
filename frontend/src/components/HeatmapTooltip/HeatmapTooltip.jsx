import { BasicTooltip } from '@nivo/tooltip'
import { localeDate } from '@utils/convertDates'

function HeatmapTooltip({ data, color }) {
  return (
    <BasicTooltip
			id={`${localeDate(data.day)}`}
			value={`${data.name}, Калорий сгорело: ${data.calories}`}
			color={color}
			enableChip
		/>
  )
}

export default HeatmapTooltip