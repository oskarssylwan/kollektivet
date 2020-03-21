import React, { useRef, useEffect, useState } from 'react'
import BBBBAnthem from '../assets/BBBB-Anthem.mp3'
import {
  H1,
  Button,
} from '../components'

const happyBabushka = 'https://enjoyrussian.com/wp-content/uploads/2017/05/pugacheva-01-500x430.jpg'
const angryBabushka = 'https://preview.redd.it/4q5vz84ck3g41.png?width=1024&auto=webp&s=b540eee3ad427b4c6708bf4aea34e74b68a253d3'

const Greeting = () =>
  <>
    <img src={happyBabushka} className="stack-l" width="500" height="400" style={{ backgroundSize: 'cover' }}/>
    <H1 className="stack-s">Well done comrade!</H1>
    <p className="stack-m">You can take break and listen to beautiful song, or continue</p>
  </>

const ThisIsTheEnd = () =>
  <>
    <img src={angryBabushka} className="stack-l" width="500" height="400" style={{ backgroundSize: 'cover' }}/>
    <H1 className="stack-s">You have made babushka angry!</H1>
    <p className="stack-m">Not listening to beautiful anthem have made babushka angry!</p>
  </>

const Messages = {
  Greeting: () => <Greeting />,
  End: () => <ThisIsTheEnd />,
}

export const FourthTest = ({ nextTest, failTest }) => {
  const [message, setMessage] = useState('Greeting')
  const anthemAudio = useRef()
  const failedTimer = useRef()

  const playAnthemAudio = () => { anthemAudio.current.play() }

  const onNoBreakNeeded = () => {
    setMessage('End')
    failedTimer.current = setTimeout(() => {
      clearTimeout(failedTimer.current)
      failTest()
    }, 2000)
  }

  return (
    <div className="vh-50 d-flex justify-center align-center flex-column inset-m">

      { Messages[message]() }

      <audio ref={anthemAudio} src={BBBBAnthem} onEnded={nextTest} />
      <div>
        <Button className="inline-m" type="button" onClick={playAnthemAudio}>Take break</Button>
        <Button type="button" onClick={onNoBreakNeeded}>I don't need break</Button>
      </div>
    </div>
  )
}
