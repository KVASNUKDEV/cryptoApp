import React from 'react'
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import {Col, Row, Typography } from 'antd';

const LineChart = ({coinHistory, currentPrice, coinName}) => {
  const coinPrice = []
  const coinTimestamp = []

  for(let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price)
    coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString())
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      { id: 1,
        label: 'Price in USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      }
    ]
  }

  return (
    <>
     <Row className="chart-header">
       <Typography.Title level={2} className="chart-title">Price Chart</Typography.Title>
       <Col className="price-container">
        <Typography.Title level={5} className="price-change">{coinHistory?.data?.change}%</Typography.Title>
        <Typography.Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Typography.Title>
       </Col>
    </Row>
    <Chart type='line' data={data} />
    </>
  )
}

export default LineChart
