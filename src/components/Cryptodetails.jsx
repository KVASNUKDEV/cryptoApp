import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';

import Loader from './Loader';
import LineChart from './LineChart';

const { Title, Text } = Typography;
const { Option } = Select;



export const Cryptodetails = () => {
  const {coinId} = useParams();
  const [timeperiod, setTimeperiod] = useState('24h');

  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({coinId, timeperiod});

  if (isFetching) return <Loader />;

  const cryptoDetails = data?.data?.coin;

    const time = ['24h','7d', '30d', '1y'];

    const stats = [
      { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
      { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
      { title: '24h Volume', value: `$ ${cryptoDetails['24hVolume'] && millify(cryptoDetails['24hVolume'])}`, icon: <ThunderboltOutlined /> },
      { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
      { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails?.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
    ];
  
    const genericStats = [
      { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
      { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
      { title: 'Aprroved Supply', value: cryptoDetails?.supply?.total? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
      { title: 'Total Supply', value: `$ ${millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
      { title: 'Circulating Supply', value: `$ ${millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
    ];
    return (
      <Col className="coin-detail-container">
        <Col className="coin-heading-container">
          <Title level={2}>{cryptoDetails.name} ({cryptoDetails.symbol}) Price</Title>
          <p>
            {cryptoDetails.name} live price in US dollars.
            View value statistics, marketcap and supply.
          </p>
        </Col>
        <Select
          defaultValue="24h"
          className="select-timeperiod"
          placeholder="Select Time period"
          onChange={(value)=>setTimeperiod(value)}
        >
         {time.map((period, i) => <Option key={i} value={period}>{period}</Option>)}
        </Select>
        <LineChart
          coinHistory={coinHistory}
          currentPrice={millify(cryptoDetails.price)}
          coinName={cryptoDetails.name} />
       
        <Col className="stats-container">
          <Col className="coin-value-statistic">
            <Col className="coin-value-statistic-heading">
              <Title level={3}>{cryptoDetails.name} Value statistics</Title>
              <p>
                An overview showing the stats of {cryptoDetails.name}
              </p>
            </Col>
            {stats.map(({icon, title, value}, i) => (
              <Col className="coin-stats" key={i}>
                <Col className="coin-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            ))}
          </Col>
          <Col className="other-stats-info">
            <Col className="coin-value-statistic-heading">
              <Title level={3}>Other statistics</Title>
              <p>
                An overview showing the stats of all cryptocurrencies
              </p>
            </Col>
            {genericStats.map(({icon, title, value}, i) => (
              <Col className="coin-stats" key={i}>
                <Col className="coin-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            ))}
          </Col>
        </Col>
        <Col className="coin-desc-link">
          <Row className="coin-desc">
            <Title level={3} className="coin-details-heading">What is {cryptoDetails.name}?</Title>
            {HTMLReactParser(cryptoDetails.description)}
          </Row>
          <Col className="coin-links">
          <Title level={3} className="coin-details-heading">{cryptoDetails.name} Links</Title>
          {cryptoDetails.links.map((link,i)=>(
            <Row className="coin-link" key={`${link.name}-${i}`}>
              <Title level={5} className="link-name">{link.type}</Title>
              <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
            </Row>
          ))}
          </Col>
        </Col>
      </Col>
    )
}

export default Cryptodetails
