import React, {Component} from 'react';
import io from 'socket.io-client';
import StockChart from './stock_chart';
import StockList from './stock_list';
import NewStock from './new_stock';
import Errors from './errors';

let socket;

export default class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {};
    
    this.addStock = this.addStock.bind(this);
    this.removeStock = this.removeStock.bind(this);
  }
  
  componentDidMount() {
    // initialize stock data by connecting to server
    socket = io.connect('http://localhost:8080');
    
    socket.on('setState', (updater) => {
      this.setState(updater);
    });
  }
  
  addStock(stockName) {
    socket.emit('add', stockName);
  }
  
  removeStock(stockName) {
    socket.emit('remove', stockName);
  }
  
  render() {
    if (!this.state.initialized) {
      return null;
    }
    
    return (
      <div>
        <StockChart stockData={this.state.stockData} />
        <StockList stockData={this.state.stockData} removeStock={this.removeStock} />
        <NewStock addStock={this.addStock} />
        <Errors error={this.state.error} />
      </div>
    );
  }
}

