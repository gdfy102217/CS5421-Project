import ReactECharts from "echarts-for-react";
import React, {useEffect} from "react";
import {option} from "./Options";
import {attributes, functionalDependencies} from "../utils/dummyData";
import {useParams} from "react-router-dom";

export const GraphEchart = ({prop}) => {
	// const level = prop.toLowerCase();
	const {level} = useParams();
	let echartsElement;

	useEffect(() => {
		option.series[0].data = generateData(level);
		option.series[0].links = generateLinks(level);
		// console.log("test!");
		echartsElement.getEchartsInstance().setOption(option);
	}, [level]);

	const generateData = (level) => {
		let x = 300;
		let y = 300;
		let data = [];

		attributes[level].forEach((attr) => {
			data.push({
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
		return data;
	}

	const generateLinks = (level) => {
		const links = [];
		functionalDependencies[level].forEach(item => {
			item.lhs.forEach(d => {
				item.rhs.forEach(e => {
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