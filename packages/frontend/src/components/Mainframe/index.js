import React, { useEffect, useState } from 'react';
import './index.css';
import cccp from './cccp.jpg';
import { processCLICommand } from './mainframeHandler'

export const Mainframe = ({ nextTest, failTest }) => {
  const textInput = React.createRef();
  const consoleEndRef = React.createRef();
  const [commands, setCommands] = useState([]);
  const [currentPath, setCurrentPath] = useState('G:/root');
  const [inputValue, setInputValue] = useState('');

  const inputKeyPressed = e => {
    if (e.key === 'Enter') {
      console.log('@Mainframe inputValue', inputValue);
      if (!inputValue) return;
      if (inputValue.toLowerCase() === 'clear') {
        setCommands([]);
        clearInput();

      } else {
        const response = processCLICommand({ path: currentPath, command: inputValue })
        const arr = commands;
        arr.push(response);
        if (response.status === 1) {
          arr.push({ path: 'G:/root', command: '*･ﾟﾟ･*:.｡..｡.:*ﾟ:*:✼✿　CCCP Shuting down　✿✼:*ﾟ:.｡..｡.:*･ﾟﾟ･*', output: 'this is all i ever wanted' });
          setTimeout(() => {
            nextTest();
          }, 4000);
        }

        if (response.status === -1) {
          setTimeout(() => {
            failTest();
          }, 40000);
        }
        clearInput();
        setCurrentPath(response.newPath);
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
        <img src={cccp} alt="C.C.C.P."/>{' '}
        <p>
          C.C.C.P. - <span>C</span>оюз <span>C</span>оветских <span>C</span>
          оциалистических <span>P</span>C{' '}
        </p>
      </header>
      <section className='console'>
        <div className='output'>
          {commands.map((command, index) => command
            && <OutputRow {...command} key={`OutputRow-${index}`} />
          )}
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
