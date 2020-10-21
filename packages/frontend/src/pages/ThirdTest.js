import React from 'react';
import { Mainframe } from '../components';
import '../index.css';

export const ThirdTest = ({ nextTest, failTest }) => {
  return (
    <section
      id='test-3'
      className='d-flex justify-center align-center vh-100 vw-100'
    >
      <Mainframe nextTest={nextTest} failTest={failTest} />
    </section>
  );
};
