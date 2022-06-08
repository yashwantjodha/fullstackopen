const Header = ({ course }) => {
    return (
      <>
        <h2>{course}</h2>
      </>
    )
  }
  
  const Part = ({ part, exercises }) => {
    return (
      <>
        <p>{part} {exercises}</p>
      </>
    )
  }
  
  const Content = ({ parts }) => {
  
    return (
      <div>
        {parts.map((part) => {
          return <Part key={part.id} part={part.name} exercises={part.exercises} />
        })}
      </div>
    )
  }
  
  const TotalExercies = ({ parts }) => {
  
    const totalCount = parts.reduce((s, p) => s + p.exercises, 0);
    return (
      <>
        <strong>total of {totalCount} exercises</strong>
      </>
    )
  }
  
  
  const Course = ({ course }) => {
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <TotalExercies parts={course.parts} />
      </div>
    )
  }

export default Course