export const option = {
	tooltip: {},
	animationDurationUpdate: 1500,
	animationEasingUpdate: 'quinticInOut',
	series: [
		{
			type: 'graph',
			layout: 'none',
			symbolSize: 50,
			roam: true,
			label: {
				show: true
			},
			edgeSymbol: ['circle', 'arrow'],
			edgeSymbolSize: [4, 10],
			edgeLabel: {
				fontSize: 20
			},
			lineStyle: {
				opacity: 0.9,
				width: 2,
				curveness: 0,
				color: 'white'
			}
		}
	]
};