import React, { useState } from 'react';
import { Row, Col, Flex, Typography, Button, Input } from "antd";
import { CloseCircleOutlined } from '@ant-design/icons';
import { useParams } from "react-router-dom";
import { MainLayout } from '../layout/MainLayout';
import { GraphEchart } from "../Echarts/GraphEchart";

export const GamePage = (props) => {
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

  var { level } = useParams();



  return (
    <MainLayout>
      <div className="App-header">
        <Typography.Title level={4} style={{ color: 'white' }}>
          Game Level: {level}
        </Typography.Title>
        <Row justify='center' style={{ marginTop: 20, minWidth: '100vh' }}>
          <Col flex={2}>
            <GraphEchart />
            {/* {
              functionalDependencies.easy.map((fd) =>
                <div>
                  <Typography.Text level={4} style={{ color: 'white' }}>
                    {fd.determinant + ' -> ' + fd.dependend}
                  </Typography.Text>
                </div>
              )
            } */}
          </Col>

          <Col flex={2}>
            <Flex vertical gap={12} justify="center" align="center">
              {inputs.map((input, index) =>
                  <Input
                      key={index}
                      placeholder="candidate key"
                      onChange={(e) => onInputChange(index, e.target.value)}
                      suffix={<CloseCircleOutlined onClick={(e) => removeSelectedInput(index)}/>}
                  />
              )}

            </Flex>
            <br/>
            <Flex horizontal gap={12} justify="center" align="center">
              <Button style={{width: 100}} onClick={addInput}>
                Add
              </Button>
              <Button style={{ width: 100 }} onClick={removeInput}>
                Remove
              </Button>
              <Button style={{width: 100}} onClick={onSubmit}>
                Submit
              </Button></Flex>
          </Col>
          <br />
          
        </Row>


      </div>
    </MainLayout>
  );
}
