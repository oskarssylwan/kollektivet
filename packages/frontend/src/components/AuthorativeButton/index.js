import React from 'react';
import './index.css';

export const AuthorativeButton = props =>
  <button
    {...props}
    className={`authorative-button ${props.className ? props.className : ''}`}/>
