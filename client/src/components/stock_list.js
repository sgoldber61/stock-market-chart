import React from 'react';

export default (props) => {
  // props contains stockData array and removeStock function
  
  return (
    <ul className="list-group">
      {props.stockData.map((element) => {
        return (
          <li className="list-group-item" key={element.name}>
            {element.name}
            <button type="button" className="close" aria-label="Close" onClick={(event) => {props.removeStock(element.name);}}>
              <span aria-hidden="true">&times;</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

