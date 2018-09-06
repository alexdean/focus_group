import React from 'react'

export const Bar = ( props ) => (
  <div key={props.data.uuid}>{props.data.name} : {props.data.value}</div>
);
