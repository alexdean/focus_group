// @flow
import React from 'react';

import styles from './Spark.css';

const HEIGHT = 60;

export const Spark = ({ series }) => (
  <svg viewBox={ `0 0 600 ${ HEIGHT }` } className={ styles.container }>
    <path d={ [...series.map( ( value, index ) => `${ index ? 'L' : 'M' } ${ 10 * index } ${ HEIGHT - ( value * ( HEIGHT - 10 ) + 5 ) }` )].join( ' ' ) } stroke="#222" fill="transparent" />
  </svg>
);
