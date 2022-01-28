import React from 'react'
//import {Col, Row, Typography, Card} from 'antd';
import {Typography} from 'antd';
//import Loader from './Loader';
//import millify from 'millify';
//import { useGetCryptoExchangesQuery } from '../services/cryptoApi';

export const Exchanges = () => {
  //const {data, isFetching} = useGetCryptoExchangesQuery();
  return <Typography.Title level={2}>Crypto Exchanges</Typography.Title>
  

  //const cryptoEchanges = data?.data?.exchanges

  // return (
  //   <>
  //     <Typography.Title level={2}>Crypto Exchanges</Typography.Title>
  //     <Row gutter={[32,32]} className="crypto-card-container">
      
  //      {cryptoEchanges.map((exchange) => (
  //       <Col xs={24} sm={12} lg={8} key={exchange.uuid} className="crypto-card">
  //       <a href={exchange.websiteUrl} rel="noreferrer" target="_blank">
  //         <Card
  //           title={`${exchange.rank}. ${exchange.name}`}
  //           extra={<img className="crypto-image" src={exchange.iconUrl} alt={exchange.name}/>}
  //           hoverable
  //         >
  //           <p>Volume: {millify(exchange.volume)}</p>
  //           <p>Market Share: {`${millify(exchange.marketShare)}%`}</p>
  //           <p>Number Of Markets: {millify(exchange.numberOfMarkets)}</p>
  //         </Card>
  //       </a>
  //     </Col>
  //      ))}
      
  //     </Row>
  //   </>
  // )
}

export default Exchanges
