import React from 'react';
import { Typography } from "antd";
import { useParams } from "react-router-dom";

export const GamePage = (props) => {
  var { level } = useParams();
  return (
    <div className="App-header">
      <Typography.Title level={2} style={{ color: 'white' }}>
        Relax And Find the Key
      </Typography.Title>

      <Typography.Title level={5} style={{ color: 'white' }}>
        Game Level: {level}
      </Typography.Title>
    </div>
  );
}
