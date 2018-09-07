import React from 'react';

import styles from './Graph.css';

export const Graph = ({ data = [] }) => (
  <div className={ styles.wrapper }>
    {
      data
        .sort( ({ name: A }, { name: B }) => A.localeCompare( B ) )
        .map( function( item, idx ) {
          return (
            <div key={ item.uuid || idx } className={ styles.row }>
              <div className={ styles.bar } style={{ width: `${ item.value * 100 }%` }}></div>
              <div className={ styles.label }>{ item.name }</div>
            </div>
          );
        })
    }
  </div>
);
