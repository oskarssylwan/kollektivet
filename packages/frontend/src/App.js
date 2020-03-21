import React, { useState } from 'react'
import {
  FirstTest,
  SecondTest,
  ThirdTest,
  FourthTest,
  FifthTest,
} from './pages'

const tests = [
  ({ nextTest, failTest }) => <FirstTest failTest={failTest} nextTest={nextTest} />,
  ({ nextTest, failTest }) => <SecondTest failTest={failTest} nextTest={nextTest} />,
  ({ nextTest, failTest }) => <ThirdTest failTest={failTest} nextTest={nextTest} />,
  ({ nextTest, failTest }) => <FourthTest failTest={failTest} nextTest={nextTest} />,
  ({ nextTest, failTest }) => <FifthTest failTest={failTest} nextTest={nextTest} />,
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
      ? setTestNr(0)
      : alert(`jesus fuck dude, it's only the first test`)
  }

  return (
    <main>
      {tests[testNr]({ nextTest, failTest })}
    </main>
  )

}
