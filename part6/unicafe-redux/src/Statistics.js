const StatisticsLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, bad, ok }) => {
  const totalReviews = good + bad + ok
  const reviewScore = good * 1 + bad * -1 + ok * 0
  const average = reviewScore / totalReviews || 0
  const positivePercent = (good / totalReviews) * 100 || 0

  return totalReviews > 0 ? (
    <table>
      <tbody>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="ok" value={ok} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={totalReviews} />
        <StatisticsLine text="average" value={average} />
        <StatisticsLine text="positive" value={positivePercent} />
      </tbody>
    </table>
  ) : (
    <p>no feedback given</p>
  )
}

export default Statistics
