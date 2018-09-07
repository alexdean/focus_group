// @flow
import React from 'react';

import styles from './Bar.css';

export const Bar = ({ value = 0 }) => (
  <div className={ styles.wrapper }>
    <div className={ styles.bar } style={{ width: `${ 100 * value }%` }}></div>
  </div>
);
