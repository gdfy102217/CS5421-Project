import ReactECharts from "echarts-for-react";
import React, {useEffect} from "react";
import {option} from "./Options";

export const GraphEchart = ({prop}) => {
	const data = prop;
	let echartsElement;

	useEffect(() => {
		option.series[0].data = generateData(data);
		option.series[0].links = generateLinks(data);
		echartsElement.getEchartsInstance().setOption(option);
	}, [data]);

	const generateData = (data) => {
		let x = 300;
		let y = 300;
		let attributes = [];

		data["attributes"].forEach((attr) => {
			attributes.push({
				name: attr,
				x: x,
				y: y
			});

			// Update x and y for the next iteration
			x += 300;
			if (x > 900) {
				x = 300;
				y += 300;
			}
		});
		return attributes;
	}

	const generateLinks = (data) => {
		const links = [];
		data["fds"].forEach(item => {
			item[0].forEach(d => {
				item[1].forEach(e => {
					links.push({
						source: d,
						target: e
					});
				});
			});
		});
		return links;
	}
	return <ReactECharts ref={(e) => {echartsElement = e}} option={option} notMerge={true} lazyUpdate={true}/>;
}