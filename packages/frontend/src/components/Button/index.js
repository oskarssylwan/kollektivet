import React from 'react'
import './index.css'

export const Button = props =>
  <button
    {...props}
    className={`button ${props.className ? props.className : ''}`}
  />
