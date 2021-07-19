import React from 'react'

const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Part = (props) => (
  <p>
    {props.name} {props.exercises}
  </p>
)

const Content = (props) => {
  console.log(props)
  return props.parts.map((part) => (
    <Part name={part.name} exercises={part.exercises} key={part.name} />
  ))
}

const Total = (props) => {
  let exercises = 0
  props.parts.forEach((part) => {
    exercises += part.exercises
  })

  return <p>Number of exercises {exercises}</p>
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of component',
        exercises: 14,
      },
    ],
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
