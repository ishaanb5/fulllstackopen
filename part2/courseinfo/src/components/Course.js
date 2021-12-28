import React from 'react'

const Header = ({ heading }) => <h2>{heading}</h2>

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part part={part} key={part.id} />
      ))}
    </div>
  )
}

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Total = ({ parts }) => {
  let totalExercises = parts.reduce((sum, { exercises }) => {
    return sum + exercises
  }, 0)
  return (
    <p>
      <strong>total of {totalExercises} exercises</strong>
    </p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header heading={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
