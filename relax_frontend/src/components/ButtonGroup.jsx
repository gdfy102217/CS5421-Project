import {Button, Space} from "antd";
import {HomeOutlined, LeftOutlined, RightOutlined} from "@ant-design/icons";
import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {GameLevelContext} from "../context/GameLevelContext";

export const ButtonGroup = ({ prop }) => {
	const index = prop;
	const navigate = useNavigate();
	const gameLevels = useContext(GameLevelContext);

	return <>
		<Button
			style={{position: "absolute", top: 100, left: 40}}
			type="primary"
			icon={<HomeOutlined />}
			onClick={() => navigate("/")}
		>
			Home
		</Button>
		{index !== 0 ?
			<Button
				style={{position: "absolute", bottom: 40, left: 40}}
				icon={<LeftOutlined/>}
				onClick={() => navigate("/game/".concat(gameLevels[index - 1]))}
			>
				Previous Level
			</Button> : <></>
		}
		{index !== gameLevels.length - 1 ?
			<Button
				style={{position: "absolute", bottom: 40, right: 40}}
				onClick={() => navigate("/game/".concat(gameLevels[index + 1]))}
			>
				<Space>
					Next Level
					<RightOutlined/>
				</Space>
			</Button>
			: <></>
		}
	</>
}