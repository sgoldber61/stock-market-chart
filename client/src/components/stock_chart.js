import React from 'react';
import ReactHighstock from 'react-highcharts/ReactHighstock.src';

const rangeSelector = {selected: 1};
const title = {text: 'Stock Prices'};
const tooltip = {valueDecimals: 2};

export default (props) => {
  // props contains stockData array
  
  const stockData = props.stockData;
  const series = stockData.map((element) => {
    return {...element, tooltip};
  });
  
  const config = {rangeSelector, title, series};
  
  return (
    <ReactHighstock config={config} />
  );
}

