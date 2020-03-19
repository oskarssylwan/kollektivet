import React, { useState, useEffect } from 'react';
import { useInterval } from '../hooks/useInterval';
import '../index.css';
import { H1, SuccessMeter } from '../components';

const alphabet = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  'Å',
  'Ä',
  'Ö'
];

export const SecondTest = ({ nextTest, failTest }) => {
  const rand = max => Math.floor(Math.random() * max);
  const randLetter = () => alphabet[rand(alphabet.length)];
  const [currentLetter, setCurrentLetter] = useState(null);
  const [score, setScore] = useState(0);
  const [init, setInit] = useState(false);

  const hit = () => {
    setCurrentLetter(randLetter());
    score < 0 ? setScore(1) : setScore(score + 1);
    score === 10 && challangeComplete();
  };

  const challangeComplete = () => {
    //TODO Fix this MF-SHIT
    const audio = new Audio('../assets/BBBB-Anthem.mp3');
    audio.play();
    /* ^^^^^^^^^^^^ anybody has any idea?  */
    alert('you won');
    setTimeout(() => {
      nextTest();
    }, 1000);
    clearInterval(interval);
  };

  let interval = useInterval(() => {
    currentLetter && miss();
    const input = document.querySelector('.hiddenInput');
    if (input) input.focus();
  }, 3000);

  useEffect(() => {
    if (!init) {
      const input = document.querySelector('.hiddenInput');
      if (input) input.focus();
      setInit(true);
    }
  }, [init, setInit]);

  const miss = () => {
    setCurrentLetter(randLetter());
    setScore(score - 1);
    if (score === -5) {
      clearInterval(interval);
      failTest();
    }
  };

  const handleKeyDown = ({ key }) => {
    if (key === ' ') {
      setCurrentLetter(randLetter());
      return;
    }

    if (!key || !currentLetter) return;

    key.toUpperCase() === currentLetter ? hit() : miss();
  };

  const inner = {
    style: {
      height: (score / 10) * 100 + 'vh',
      width: (score / 10) * 100 + 'vw',
      backgroundImage: `url('https://i.imgur.com/DyhbeA5.png')`,
      opacity: score / 12
    }
  };

  return (
    <div>
      <div className='d-flex flex-column justify-center align-center vw-100 vh-100'>
        <H1> {currentLetter || 'space bar'} </H1>
        <input className='hiddenInput' onKeyPress={handleKeyDown} />
        <SuccessMeter inner={inner} container={{}} />
        <span id='audio' />
      </div>
    </div>
  );
};
