import axios from 'axios';
import Queue from 'simple-promise-queue';

function getURL(stockName) {
  return `https://cors-anywhere.herokuapp.com/https://www.quandl.com/api/v3/datasets/WIKI/${stockName}/data.json`;
}

const params = {
  order: 'asc',
  column_index: 11, // stock data for adjusted close
  api_key: process.env.REACT_APP_quandlApiKey
};


// get a single stock

export function getStock(stockName) {
  return axios.get(getURL(stockName), {params}).then((response) => {
    if (response.data.quandl_error) {
      return Promise.reject(response.data.quandl_error);
    }
    else {
      // convert stock data from string to millisecond timestamps
      const data = response.data.dataset_data.data;
      
      data.forEach((element) => {
        element[0] = Date.parse(element[0]);
      });
      
      return Promise.resolve({name: stockName, data});
    }
  });
}


// get multiple stocks
// see https://stackoverflow.com/questions/42896456/get-which-promise-completed-in-promise-race for dealing with a queue of simultaneous promises


export function getStocks(stockNames) {
  const queue = new Queue({
    autoStart: true,
    concurrency: 2
  });
  const promiseArray = [];
  
  stockNames.forEach((stockName) => {
    const promise = queue.pushTask((resolve, reject) => {
      resolve(getStock(stockName));
    });
    
    promiseArray.push(promise);
  });
  
  return Promise.all(promiseArray);
}

