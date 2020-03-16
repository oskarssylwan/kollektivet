import React from 'react';
import './index.css';

export const SuccessMeter = props =>
  <div
    {...props.container}
    className="success-container"
  >
    <div
      {...props.inner}
      style={props.inner.style
        ? props.inner.style
        : ''}
      className={'success-inner' + props.inner.className
        ? props.inner.className
        : ''}
    />
  </div>
