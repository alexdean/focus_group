// @flow
import React from 'react';

export const Bar = ({ name, value }) => (
  <div style={{
      height: '20px',
      width: `${ Math.floor( value * 100 ) }%`,
      border: '1px solid #828',
      backgroundColor: '#E8E',
      marginBottom: '5px'
    }}>
    { name }
  </div>
);
