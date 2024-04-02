import React from 'react';
import {Button, Typography} from "antd";
import {useNavigate} from 'react-router-dom';
import {difficultyLevels} from '../utils/dummyData';
import {MainLayout} from '../layout/MainLayout';

export const HomePage = () => {
	const navigate = useNavigate();
	return (
		<MainLayout>
			<div className="App-header">
				<Typography.Title level={2} style={{color: 'white'}}>
					Welcome!
				</Typography.Title>
				<Typography.Title level={5} style={{color: 'white'}}>
					Please choose your difficulty level
				</Typography.Title>
				{difficultyLevels.map((level) =>
					(<Button className="button" onClick={() => navigate("/game/".concat(level))}>
						{level}
					</Button>)
				)}
			</div>
		</MainLayout>
	);
}
