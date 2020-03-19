import React, { useEffect, useState } from 'react';
import './index.css';
import cccp from './cccp.jpg';
import { postData } from '../../util/fetch';

export const Mainframe = ({ nextTest, failTest }) => {
  const textInput = React.createRef();
  const consoleEndRef = React.createRef();

  const testCommands = [
    { command: 'cd backend', location: 'C:/code' },
    {
      command: 'npm start',
      path: 'C:/code/backend',
      output: 'Started Backend..'
    }
  ];
  const [commands, setCommands] = useState([]);
  const [currentPath, setCurrentPath] = useState('C:/');
  const [inputValue, setInputValue] = useState('');
  const [apiUrl, setApiUrl] = useState('http://localhost:3001/api/mainframe');

  const inputKeyPressed = e => {
    if (e.key === 'Enter') {
      console.log(inputValue);
      if (!inputValue) return;
      if (inputValue.toLowerCase() == 'clear') {
        setCommands([]);
        clearInput();

      } else {
        //  Do api call
        postData(apiUrl, { path: currentPath, command: inputValue }).then((res) => {
          //  Append Command
          const arr = commands;
          arr.push(res);
          if (res.status) {
            arr.push({ path: 'G:/root', command: '*･ﾟﾟ･*:.｡..｡.:*ﾟ:*:✼✿　CCCP Shuting down　✿✼:*ﾟ:.｡..｡.:*･ﾟﾟ･*', output: 'this is all i ever wanted' });
            setTimeout(() => {
              nextTest();
            }, 4000);
          }
          clearInput();
        });
      }
    }
  };

  const focusTextInput = () => {
    if (textInput) {
      textInput.current.focus();
    }
  };
  const scrollToBottom = () => {
    if (consoleEndRef && consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const onInputChange = e => {
    setInputValue(e.target.value);
  };

  const clearInput = () => {
    if (textInput && textInput.current) {
      textInput.current.value = '';
      setInputValue('');
    }
  };

  useEffect(() => {
    focusTextInput();
    scrollToBottom(); // This shit gets called everytime because fucking react hates refs fucking shit fuck react
  });

  return (
    <div id='mainframe'>
      <header>
        <img src={cccp} />{' '}
        <p>
          C.C.C.P. - <span>C</span>оюз <span>C</span>оветских <span>C</span>
          оциалистических <span>P</span>C{' '}
        </p>
      </header>
      <section className='console'>
        <div className='output'>
          {commands.map((command, index) => {
            if (command) {
              return <OutputRow {...command} key={`OutputRow-${index}`} />;
            }
          })}
          <div ref={consoleEndRef}></div>
        </div>
        <div className='input-section'>
          <p>{currentPath}</p>
          <div className='input-row'>
            <span className='command-arrow'>></span>
            <input
              placeholder=''
              autoComplete='false'
              spellCheck='false'
              onKeyPress={inputKeyPressed}
              ref={textInput}
              onChange={e => onInputChange(e)}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const OutputRow = props => (
  <div className='output-row'>
    <p className='path'>{props.path}</p>
    <p className='command'>
      <span className='command-arrow'>></span>
      {props.command}
    </p>
    {props.output ? <p>{props.output}</p> : null}
  </div>
);
