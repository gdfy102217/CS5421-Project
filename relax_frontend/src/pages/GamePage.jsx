import React, { useState } from 'react';
import { Row, Col, Typography, Checkbox, Button } from "antd";
import { useParams } from "react-router-dom";
import { MainLayout } from '../layout/MainLayout';
import { functionalDependencies } from '../utils/dummyData';
// import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';

export const GamePage = (props) => {
  const [checkedValues, setCheckedValues] = useState();
  const candidateKeys = ['A', 'B', 'C'];

  const onChange = (checkedValues) => {
    setCheckedValues(checkedValues);
  };

  const onSubmit = () => {
    console.log(checkedValues);
  }

  var { level } = useParams();

  // Draw the chart
  const option = {
    // title: {
    //   text: 'Functional Dependency Graph',
    // },
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        type: 'graph',
        layout: 'none',
        symbolSize: 50,
        roam: true,
        label: {
          show: true
        },
        edgeSymbol: ['circle', 'arrow'],
        edgeSymbolSize: [4, 10],
        edgeLabel: {
          fontSize: 20
        },
        data: [
          {
            name: 'A',
            x: 300,
            y: 300
          },
          {
            name: 'B',
            x: 800,
            y: 300
          },
          {
            name: 'C',
            x: 550,
            y: 100
          },
          {
            name: 'D',
            x: 550,
            y: 500
          }
        ],
        links: [
          {
            source: 'A',
            target: 'B'
          },
          {
            source: 'B',
            target: 'C'
          },
          {
            source: 'C',
            target: 'D'
          }
        ],
        lineStyle: {
          opacity: 0.9,
          width: 2,
          curveness: 0,
          color: 'white'
        }
      }
    ]
  };

  return (
    <MainLayout>
      <div className="App-header">
        <Typography.Title level={4} style={{ color: 'white' }}>
          Game Level: {level}
        </Typography.Title>
        <Row justify='center' style={{ marginTop: 20, minWidth: '100vh' }}>
          <Col flex={2}>
          <ReactECharts option={option} />
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
            <Checkbox.Group style={{ color: 'white' }} onChange={onChange} >
              {
                candidateKeys.map((ck, key) =>
                  <Row>
                    <Col span={24}>
                      <Checkbox value={ck}>
                        <Typography.Text level={4} style={{ color: 'white' }}>
                          {ck}
                        </Typography.Text>
                      </Checkbox>
                    </Col>
                  </Row>
                )
              }
            </Checkbox.Group>
            <Button onClick={onSubmit}>
            submit
          </Button> 
          </Col>
          <br />
          
        </Row>


      </div>
    </MainLayout>
  );
}
