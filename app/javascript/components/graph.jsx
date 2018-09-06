import React from 'react'
import {Bar} from "./bar.jsx"
export const Graph = ({ data = [] }) => (
  <div>
    {
      data.map(function(item, idx) {
        return (
          <Bar key={ idx } data={ item }/>
        );
      })
    }
  </div>
);
