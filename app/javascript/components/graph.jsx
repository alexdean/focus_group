import React from 'react'
import {Bar} from "./bar.jsx"
export const Graph = ( props ) => (
  <div>
    {
      props.data.map(function(item, idx) {
        return <Bar data={item}/>;
      })
    }
  </div>
);
