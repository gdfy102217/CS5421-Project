import React from "react";
import {Typography} from "antd";
import {useParams} from "react-router-dom";

export const Header = () => {
	const {level} = useParams();
	return (
		<div style={{minHeight: '8vh', background: 'grey'}}>
			<header>
				<div style={{position: 'fixed', marginLeft: 20}}>
					<h2>Relax And Find the Key</h2>
				</div>
				{level ? <Typography.Title level={3} style={{
					position: "absolute",
					left: "50%",
					top: "1vh",
					transform: "translate(-50%, -50%)"
				}}>
					Game Level: {level}
				</Typography.Title> : <></>}
			</header>
		</div>
	);
}