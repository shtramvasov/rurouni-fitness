const primaryColor = '#e1e4f4'
const secondaryColor = '#ABACB8'
const lineColor = '#61C86A'

export const configuration = {
	lineChart: {
		margin: {
			right: 30,
			top: 5,
		},
	},
	grid: {
		strokeDasharray: '3 3',
		opaty: 0.55,
	},
	XAxis: {
		dataKey: 'date',
		dy: 2,
		stroke: primaryColor,
		tickSize: 12,
		tick: { fill: secondaryColor, fontSize: 12 },
	},
	YAxis: {
		stroke: primaryColor,
		tickCount: 8,
		tickSize: 12,
		domain: ['dataMin - 10', 'dataMax + 10'],
		tick: { fill: secondaryColor, fontSize: 12 },
	},
	line: {
		dataKey: 'weight',
		stroke: lineColor,
		strokeWidth: '1.5',
	},
}