import React, { useState } from 'react';
import {
  FirstTest,
  SecondTest,
} from './pages';

const tests = [
  ({ nextTest }) => <FirstTest nextTest={nextTest}/>,
  ({ nextTest }) => <SecondTest nextTest={nextTest}/>,
]

export const App = () => {
  const [testNr, setTestNr] = useState(0)

  const nextTest = () => {
    testNr >= (tests.length - 1)
      ? setTestNr(tests.length - 1)
      : setTestNr(testNr + 1)
  }

  return (
    <main>
      { tests[testNr]({ nextTest }) }
    </main>
  )

}
