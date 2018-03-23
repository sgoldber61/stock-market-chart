import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

const initialStockNames = ['AAPL', 'GOOGL', 'MSFT', 'AMZN'];
ReactDOM.render(<App initialStockNames={initialStockNames} />, document.getElementById('root'));

