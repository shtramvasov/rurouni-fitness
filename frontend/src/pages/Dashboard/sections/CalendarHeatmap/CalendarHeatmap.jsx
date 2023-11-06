import { ResponsiveCalendar } from '@nivo/calendar'
import { currentYear } from '@utils/convertDates'
import { mapCalendarValues } from '@utils/sessionsUtils'
import HeatmapTooltip from '@components/HeatmapTooltip/HeatmapTooltip'
import styles from './calendar-heatmap.module.scss'
import { configuration } from './calendar.data'

function CalendarHeatmap({ data }) {
  return (
    <section className={styles.calendar}>
      <ResponsiveCalendar
          from={`${currentYear}`}
          to={`${currentYear}`}
          data={mapCalendarValues(data ?? [])}
          tooltip={HeatmapTooltip}
          {...configuration}
        />
  </section>
  )
}

export default CalendarHeatmap