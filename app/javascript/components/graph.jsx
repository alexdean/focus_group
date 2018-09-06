import React from 'react'

export const Graph = ( props ) => (
  <div>
    {
      props.data.map(function(item, idx) {
        return (
          <div key={idx}>{item.name}</div>
        );
      })
    }
  </div>
);
