import React from 'react';

import { Bar } from '../Bar';

export const Graph = ({ data = [] }) => (
  <div style={{ padding: '10px 0' }}>
    {
      data.map( function( item, idx ) {
        return (
          <Bar key={ item.uuid || idx } { ...item } />
        );
      })
    }
  </div>
);
