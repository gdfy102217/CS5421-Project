import React, {useState, useContext, useEffect} from 'react';
import {Row, Col, Flex, Typography, Button, Input} from "antd";
import {CloseCircleOutlined} from '@ant-design/icons';
import {useParams} from "react-router-dom";
import {MainLayout} from '../layout/MainLayout';
import {GraphEchart} from "../Echarts/GraphEchart";
import {GameLevelContext} from "../context/GameLevelContext";
import {functionalDependencies} from "../utils/dummyData";
import {ButtonGroup} from "../components/ButtonGroup";

export const GamePage = (props) => {
	const gameLevels = useContext(GameLevelContext);
	const {level} = useParams();
	const index = gameLevels.indexOf(level);
	const [inputs, setInputs] = useState([""]);

	useEffect(() => {
		setInputs([""]);
	}, [level]);

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
		if (inputs.length === 1) return;
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
						<Typography.Title style={{ textAlign: "center", color: 'white' }} level={3}>Functional Dependency</Typography.Title>
						{functionalDependencies[level] ?
              functionalDependencies[level].map((fd, index) =>
                <div key={index} style={{ display: "flex", justifyContent: "center", marginTop: 10, minWidth: "100%", background: "deepskyblue"}}>
                  <Typography.Text level={3} style={{ textAlign: "center", color: 'white' }}>
                    {fd.lhs.join("") + ' -> ' + fd.rhs.join("")}
                  </Typography.Text>
                </div>
              )
            : <></>}
					</Col>
					<Col span={8}>
						<Flex vertical gap={12} justify="center" align="center">
							<Typography.Title style={{ textAlign: "center", color: 'white' }} level={3}>Find all candidate keys</Typography.Title>
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
							<Button style={{width: 100}} disabled={inputs.length <= 1} onClick={removeInput}>
								Remove
							</Button>
							<Button style={{width: 100}} onClick={onSubmit}>
								Submit
							</Button>
						</Flex>
					</Col>
					<br/>

				</Row>
				<ButtonGroup prop={index}/>
			</div>

		</MainLayout>
	);
}
