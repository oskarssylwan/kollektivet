import React, { useState } from 'react'
import {
  FirstTest,
  SecondTest,
  ThirdTest,
  FourthTest
} from './pages'

const tests = [
  ({ nextTest, failTest }) => <FirstTest failTest={failTest} nextTest={nextTest} />,
  ({ nextTest, failTest }) => <SecondTest failTest={failTest} nextTest={nextTest} />,
  ({ nextTest, failTest }) => <ThirdTest failTest={failTest} nextTest={nextTest} />,
  ({ nextTest, failTest }) => <FourthTest failTest={failTest} nextTest={nextTest} />,
]

export const App = () => {
  const [testNr, setTestNr] = useState(0)

  const nextTest = () => {
    testNr >= (tests.length - 1)
      ? setTestNr(tests.length - 1)
      : setTestNr(testNr + 1)
  }

  const failTest = () => {
    testNr > 0
      ? setTestNr(testNr - 1)
      : console.log('noob')
  }

  return (
    <main>
      {tests[testNr]({ nextTest, failTest })}
    </main>
  )

}
