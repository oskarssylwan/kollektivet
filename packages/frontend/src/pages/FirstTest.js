import React, { useRef, useState } from 'react';
import {
  AuthorativeButton,
  H1
} from '../components';

const restingAnimation = 'shadow-pulse'
const enterAnimationClass = 'scale-in-center'
const exitAnimationClass = 'scale-out-center'
const exitAnimationDuration = 1000
const enterAnimationDuration = 500

const randomPrecentage = () => `${Math.random() * 500}%`

const messages = [
  () => <>Welcome friend <br/> Pls click button to start test</>,
  () => <>Ooops, this is first test!</>,
  () => <img src="https://emojis.slackmojis.com/emojis/images/1484128655/1624/slav_squat.gif?1484128655" />
]

export const FirstTest = ({ nextTest }) => {
  const [tries, setTries] = useState(0);
  const [animationClass, setAnimationClass] = useState(restingAnimation);
  const [buttonPositionX, setButtonPositionX] = useState();
  const [buttonPositionY, setButtonPositionY] = useState();
  const timeoutRef = useRef();

  const clearTimers = () => {
    timeoutRef.current.forEach(clearTimeout)
  };

  const incrementTries = () => {
    tries >= (messages.length - 1)
      ? setTries(messages.length - 1)
      : setTries(tries + 1)
  }

  const moveButton = () => {
    setAnimationClass(exitAnimationClass)
    incrementTries()

    const enterTimeoutRef = setTimeout(() => {
      setButtonPositionX(randomPrecentage())
      setButtonPositionY(randomPrecentage())
      setAnimationClass(enterAnimationClass)
    }, exitAnimationDuration)

    const restingTimeoutRef = setTimeout(() => {
      setAnimationClass(restingAnimation)
      clearTimers()
    }, exitAnimationDuration + enterAnimationDuration)

    timeoutRef.current = [enterTimeoutRef, restingTimeoutRef]
  }

   return (
     <div className="vh-100 d-flex align-center flex-column">

      <div className="inset-xl">
        <H1 className="stack-m text-alig-center">
          {messages[tries]()}
        </H1>
      </div>

      <div className="flex-fill vw-100 d-flex justify-center align-center scroll">
        <div
          className="inset-l stack-xl"
          onMouseEnter={moveButton}
          style={tries < 1 ? {} : {
            transform: `translate(${buttonPositionX}, ${buttonPositionY})`,
            webkitTransform: `translate(${buttonPositionX}, ${buttonPositionY})`,
          }}
          >
          <AuthorativeButton className={animationClass} onClick={nextTest}>за Родину</AuthorativeButton>
        </div>
      </div>

     </div>
   )
}
