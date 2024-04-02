// Draw the chart
export const option = {
    // title: {
    //   text: 'Functional Dependency Graph',
    // },
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
            data: [
                {
                    name: 'A',
                    x: 300,
                    y: 300
                },
                {
                    name: 'B',
                    x: 800,
                    y: 300
                },
                {
                    name: 'C',
                    x: 550,
                    y: 100
                },
                {
                    name: 'D',
                    x: 550,
                    y: 500
                }
            ],
            links: [
                {
                    source: 'A',
                    target: 'B'
                },
                {
                    source: 'B',
                    target: 'C'
                },
                {
                    source: 'C',
                    target: 'D'
                }
            ],
            lineStyle: {
                opacity: 0.9,
                width: 2,
                curveness: 0,
                color: 'white'
            }
        }
    ]
};