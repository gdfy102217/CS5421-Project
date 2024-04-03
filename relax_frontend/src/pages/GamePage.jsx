import React, {useState, useContext} from 'react';
import {Row, Col, Flex, Typography, Button, Input, Space} from "antd";
import {CloseCircleOutlined, RightOutlined, LeftOutlined, HomeOutlined} from '@ant-design/icons';
import {useNavigate, useParams} from "react-router-dom";
import {MainLayout} from '../layout/MainLayout';
import {GraphEchart} from "../Echarts/GraphEchart";
import {GameLevelContext} from "../context/GameLevelContext";
import {functionalDependencies} from "../utils/dummyData";

export const GamePage = (props) => {
	const gameLevels = useContext(GameLevelContext);
	const {level} = useParams();
	const index = gameLevels.indexOf(level);
	const navigate = useNavigate();
	const [inputs, setInputs] = useState([""]);

	const onInputChange = (index, value) => {
		const newInputs = [...inputs]; // Create a copy of the inputs array
		newInputs[index] = value; // Update the value at the specified index
		setInputs(newInputs);
	}
	const addInput = () => {
		setInputs([...inputs, ""]);
	}

	const removeInput = () => {
		const newInputs = inputs.slice(0, -1);
		setInputs(newInputs);
	}

	const removeSelectedInput = (index) => {
		console.log(index)
		const newInputs = inputs.filter((_, i) => i !== index);
		setInputs(newInputs);
	}

	const onSubmit = () => {
		console.log(inputs);
	}

	return (
		<MainLayout>
			<div className="App-header">
				<Row justify='center' style={{marginTop: 20, minWidth: '100%', minHeight: "100%"}}>
					<Col span={12}>
						<GraphEchart prop={level}/>
					</Col>
					<Col span={4}>
						{functionalDependencies[level] ?
              functionalDependencies[level].map((fd, index) =>
                <div key={index} style={{ display: "flex", justifyContent: "center", alignItems: "center", minWidth: "100%"}}>
                  <Typography.Text level={4} style={{ textAlign: "center", color: 'white' }}>
                    {fd.lhs.join("") + ' -> ' + fd.rhs.join("")}
                  </Typography.Text>
                </div>
              )
            : <></>}
					</Col>
					<Col span={8}>
						<Flex vertical gap={12} justify="center" align="center">
							{inputs.map((input, index) =>
								<Input
									key={index}
									style={{width: 350}}
									placeholder="candidate key"
									onChange={(e) => onInputChange(index, e.target.value)}
									suffix={<CloseCircleOutlined onClick={(e) => removeSelectedInput(index)}/>}
								/>
							)}

						</Flex>
						<br/>
						<Flex gap={12} justify="center" align="center">
							<Button style={{width: 100}} onClick={addInput}>
								Add
							</Button>
							<Button style={{width: 100}} onClick={removeInput}>
								Remove
							</Button>
							<Button style={{width: 100}} onClick={onSubmit}>
								Submit
							</Button>
						</Flex>
					</Col>
					<br/>

				</Row>
				<Button
					style={{position: "absolute", top: 100, left: 40}}
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
			</div>

		</MainLayout>
	);
}
