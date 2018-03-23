import React, {Component} from 'react';
import StockChart from './stock_chart';
import StockList from './stock_list';
import NewStock from './new_stock';
import Errors from './errors';
import * as actions from '../actions';

export default class App extends Component {
  constructor(props) {
    // props contains initialStockNames array
    super(props);
    
    this.state = {};
    
    this.addStock = this.addStock.bind(this);
    this.removeStock = this.removeStock.bind(this);
  }
  
  componentDidMount() {
    actions.getStocks(this.props.initialStockNames).then((stockData) => {
      this.setState({stockData, initialized: true});
    }).catch((error) => {
      console.log(error.message);
      this.setState({error});
    });
  }
  
  addStock(stockName) {
    stockName = stockName.toUpperCase();
    
    actions.getStock(stockName).then((stockDataElement) => {
      const newStockData = [...this.state.stockData, stockDataElement];
      this.setState({stockData: newStockData, error: null});
    }).catch((error) => {
      console.log(error.message);
      this.setState({error});
    });
  }
  
  removeStock(index) {
    const newStockData = [...this.state.stockData];
    newStockData.splice(index, 1);
    this.setState({stockData: newStockData, error: null});
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

