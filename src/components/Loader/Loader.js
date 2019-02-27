import './Loader.css';
import React from 'react';

export default function () {
  const style = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '24%'
  };

  return (
      <div style={style} className='container'>
        <div  className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
  )
}