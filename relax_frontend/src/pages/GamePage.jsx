import React, {useState, useContext, useEffect} from 'react';
import {Row, Col, Flex, Typography, Button, Input, Spin} from "antd";
import {CloseCircleOutlined} from '@ant-design/icons';
import {useNavigate, useParams} from "react-router-dom";
import {MainLayout} from '../layout/MainLayout';
import {GraphEchart} from "../Echarts/GraphEchart";
import {GameLevelContext} from "../context/GameLevelContext";
import {ButtonGroup} from "../components/ButtonGroup";
import {ScoreModal} from "../components/ScoreModal";

export const GamePage = (props) => {
	const gameLevels = useContext(GameLevelContext);
	const {level} = useParams();
	const index = gameLevels.indexOf(level);
	const [inputs, setInputs] = useState([""]);
	const [data, setData] = useState(null);
	const [openModal, setOpenModal] = useState(false);
	const [score, setScore] = useState(0);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	if (!gameLevels.includes(level)) {
		navigate("/404");
	}

	useEffect(() => {
		setLoading(true);
		setData(null);
		setInputs([""]);
		const fetchData = async () => {
			try {
				const response = await fetch(
					`http://127.0.0.1:8000/api/functionalDependencies/?difficulty=${level.toLowerCase()}`
				);
				const jsonData = await response.json();
				setData(jsonData);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};
		fetchData();

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

	const normalizeString = str => str.split('').sort().join('');
	const onSubmit = () => {
		if (!data || !data["candidate_keys"]) {
			setError(error.message);
		}
		const scorePerKey = 100 / data["candidate_keys"].length;
		setScore(0);
		let newScore = 0;
		// Normalize elements in input array
		const normalizedInputs = inputs.map(normalizeString);
		const candidate_keys = JSON.parse(JSON.stringify(data["candidate_keys"]));

		// Check if normalizedInput elements exist in candidate_keys
		for (let i = 0; i < normalizedInputs.length; i++) {
			const key = normalizedInputs[i];
			let foundIndex = -1;
			// Check each candidate key
			for (let j = 0; j < candidate_keys.length; j++) {
				const normalizedCandidateKey = candidate_keys[j].slice().sort().join('');
				console.log(normalizedCandidateKey);
				if (key === normalizedCandidateKey) {
					newScore += scorePerKey;
					foundIndex = j;
					break;
				}
			}

			// Remove the matched element from candidate_keys array
			if (foundIndex !== -1) {
				candidate_keys.splice(foundIndex, 1);
			}
		}
		if (Number.isInteger(newScore)) {
			setScore(newScore.toFixed(0));
		} else {
			setScore(newScore.toFixed(2));
		}
		setOpenModal(true);
	}

	if (loading) {
		return <MainLayout>
			<Flex align="center" gap="middle">
				<Spin size="large"/>
			</Flex>
		</MainLayout>;
	}

	if (error) {
		return <MainLayout>
			<Flex align="center" gap="middle">
				<Typography.Title style={{color: 'white'}} level={3}>Error: {error}</Typography.Title>
			</Flex>
		</MainLayout>;
	}

	return (
		<MainLayout>
			<Row justify='center' style={{marginTop: 20, minWidth: '100%', minHeight: "100%"}}>
				<Col span={10}>
					<GraphEchart prop={data}/>
				</Col>
				<Col span={4}>
					<Typography.Title style={{textAlign: "center", color: 'white'}} level={4}>Functional
						Dependency</Typography.Title>
					{data["fds"] ?
						data["fds"].map((fd, index) =>
							<div key={index} style={{
								display: "flex",
								justifyContent: "center",
								marginTop: 10,
								minWidth: "100%",
								background: "deepskyblue"
							}}>
								<Typography.Text level={3} style={{textAlign: "center", color: 'white'}}>
									{fd[0].join("") + ' -> ' + fd[1].join("")}
								</Typography.Text>
							</div>
						)
						: <></>}
				</Col>
				<Col span={10}>
					<Flex vertical gap={12} justify="center" align="center">
						<Typography.Title style={{textAlign: "center", color: 'white'}} level={3}>Find all candidate
							keys</Typography.Title>
						{inputs.map((input, index) =>
							<Input
								key={index}
								style={{maxWidth: 350}}
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
			<br/>
			<ScoreModal
				setOpenModal={setOpenModal} openModal={openModal}
				score={score}
				answer={data["candidate_keys"].map(key => key.slice().sort().join('')).join(', ')}
			/>
		</MainLayout>
	);
}
