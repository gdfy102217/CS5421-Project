import React, {useContext} from 'react';
import {Button, Typography} from "antd";
import {useNavigate} from 'react-router-dom';
import {GameLevelContext} from "../context/GameLevelContext";
import {MainLayout} from '../layout/MainLayout';

export const HomePage = () => {
	const navigate = useNavigate();
	const gameLevels = useContext(GameLevelContext);
	return (
		<MainLayout>
			<Typography.Title level={2} style={{color: 'white'}}>
				Welcome!
			</Typography.Title>
			<Typography.Title level={5} style={{color: 'white'}}>
				Please choose your difficulty level
			</Typography.Title>
			{gameLevels.map((level) =>
				(<Button className="button" onClick={() => navigate("/game/".concat(level))}>
					{level}
				</Button>)
			)}
		</MainLayout>
	);
}
