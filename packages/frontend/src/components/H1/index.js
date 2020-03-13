import React from 'react';
import './index.css';

export const H1 = props =>
  <h1 {...props} className={'h1' + props.className ? props.className : ''}/>
