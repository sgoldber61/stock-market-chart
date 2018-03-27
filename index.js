const dotenv = require('dotenv').config();
const express = require('express');
const socket = require('socket.io');
const path = require('path');
const app = express();
const actions = require('./actions');

const port = process.env.PORT;

app.use('/', express.static(`${__dirname}/build`));

// express will serve up index.html if it doesn't recognize the route
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

const server = app.listen(port, () => {
  console.log(`Listening to requests on port ${port}`);
});

// Socket setup
const io = socket(server);

const initialStockNames = ['AAPL', 'GOOGL', 'MSFT', 'AMZN']; // default stock names
const state = {};

// helper function for setting state in the back end and emitting it to the front end

function updateState(updater) {
  Object.assign(state, updater);
  io.sockets.emit('setState', updater);
}

// helper function for getting stockName index
function getStockNameIndex(stockData, stockName) {
  for (let i = 0; i < stockData.length; i++) {
    if (stockData[i].name === stockName) {
      return i;
    }
  }
  
  return -1;
}

// asynchronously set up initial state

actions.getStocks(initialStockNames).then((stockData) => {
  updateState({stockData, initialized: true});
}).catch((error) => {
  console.log(error.message);
  updateState({error: error.message});
});


// define socket connection behavior
io.on('connection', (socket) => {
  console.log('made socket connection', socket.id);
  
  // once the socket connection is made, retrieve the current state
  io.sockets.emit('setState', state);
  
  // set up event listeners for adding and removing stocks
  socket.on('add', (stockName) => {
    stockName = stockName.toUpperCase();
    // check for stockName
    const index = getStockNameIndex(state.stockData, stockName);
    if (index !== -1) {
      updateState({error: "Stock is already on the chart"});
      return;
    }
    
    actions.getStock(stockName).then((stockDataElement) => {
      const newStockData = [...state.stockData, stockDataElement];
      updateState({stockData: newStockData, error: null});
    }).catch((error) => {
      console.log(error.message);
      updateState({error: error.message});
    });
  });
  
  socket.on('remove', (stockName) => {
    const newStockData = [...state.stockData];
    const index = getStockNameIndex(newStockData, stockName);
    newStockData.splice(index, 1);
    updateState({stockData: newStockData, error: null});
  });
  
});

