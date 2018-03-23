import React from 'react';

export default (props) => {
  if (props.error) {
    return (
      <div>
        {props.error.message}
      </div>
    );  
  }
  else {
    return null;
  }
}

