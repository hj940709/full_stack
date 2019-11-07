import React from 'react'

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Part = (props) => {
    return (
        <p>{props.name} {props.exercise}</p>
    )
}

const Content = (props) => {
    return (
        <div>
            {props.parts.map(part => <Part key={part.id} name={part.name} exercise={part.exercises} />) }
        </div>
    )
}


const Total = (props) => {
    return (
        <p><strong>Total of {props.total} exercises</strong></p>
    )
}

const Course = (props) => {
    const {course} = props
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts}/>
            <Total total={course.parts.map(x => x.exercises).reduce((x, y) => x + y)} />
        </div>
    )
}

export default Course