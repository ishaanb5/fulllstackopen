import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = (props) => {
  const { good, neutral, bad, score, totalCount } = props
  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={totalCount} />
        <StatisticLine text='average' value={score / totalCount} />
        <StatisticLine
          text='positive'
          value={(good / totalCount) * 100 + '%'}
        />
      </tbody>
    </table>
  )
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [score, setScore] = useState(0)

  const handleGoodFeedback = () => {
    setGood(good + 1)
    setTotalCount(totalCount + 1)
    setScore(score + 1)
  }
  const handleNeutralFeedback = () => {
    setNeutral(neutral + 1)
    setTotalCount(totalCount + 1)
  }
  const handleBadFeedback = () => {
    setBad(bad + 1)
    setTotalCount(totalCount + 1)
    setScore(score - 1)
  }

  const feedback = totalCount ? (
    <Statistics
      good={good}
      neutral={neutral}
      bad={bad}
      totalCount={totalCount}
      score={score}
    />
  ) : (
    <p>No feedback given</p>
  )

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodFeedback} text='good' />
      <Button handleClick={handleNeutralFeedback} text='neutral' />
      <Button handleClick={handleBadFeedback} text='bad' />
      <h1>statistics</h1>
      {feedback}
    </div>
  )
}

export default App
