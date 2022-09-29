import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'
import Statistics from './Statistics'

const store = createStore(reducer)

const Button = ({ clickHandler, children }) => (
  <button onClick={clickHandler}>{children}</button>
)

const App = () => {
  const handleReview = (reviewType) => {
    switch (reviewType) {
      case 'good':
        store.dispatch({ type: 'GOOD' })
        break

      case 'bad':
        store.dispatch({ type: 'BAD' })
        break

      case 'ok':
        store.dispatch({ type: 'OK' })
        break

      case 'reset':
        store.dispatch({ type: 'ZERO' })
        break

      default:
        break
    }
  }

  const { good, bad, ok } = store.getState()

  return (
    <div>
      <h2>give feedback</h2>
      <Button clickHandler={() => handleReview('good')}>good</Button>
      <Button clickHandler={() => handleReview('bad')}>bad</Button>
      <Button clickHandler={() => handleReview('ok')}>ok</Button>
      <Button clickHandler={() => handleReview('reset')}>reset stats</Button>
      <h2>statistics</h2>
      <Statistics good={good} bad={bad} ok={ok} />
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
