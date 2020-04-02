import React from 'react';

// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartExtendedBase {
  name: string;
  description: string;
  exerciseCount: number;
}

interface CoursePartOne extends CoursePartExtendedBase {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartExtendedBase {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartExtendedBase {
  name: "My own type usage";
  usage: string;
  groupProjectCount: number;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

// this is the new coursePart variable
const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
  },
  {
    name: "My own type usage",
    exerciseCount: 14,
    description: "Confusing description",
    usage: "Very useful",
    groupProjectCount: 3
  }
];

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Header: React.FC<{courseName: string}> = ({courseName}) => {
  return <h1>{courseName}</h1>;
};

const Part: React.FC<{coursePart: CoursePart}> =({coursePart}) => {
  switch(coursePart.name){
    case 'Fundamentals':
      return <p>{coursePart.name} {coursePart.exerciseCount} {coursePart.description}</p>;
    case 'Using props to pass data':
      return <p>{coursePart.name} {coursePart.exerciseCount} {coursePart.groupProjectCount}</p>;
    case 'Deeper type usage':
      return <p>{coursePart.name} {coursePart.exerciseCount} {coursePart.description} {coursePart.exerciseSubmissionLink}</p>;
    case 'My own type usage':
      return <p>{coursePart.name} {coursePart.exerciseCount} {coursePart.description} {coursePart.groupProjectCount} {coursePart.usage}</p>;
    default:
      return assertNever(coursePart);
  }
}

const Content: React.FC<{courseParts: CoursePart[]}> = ({courseParts}) => {
  return (
    <div>
      {courseParts.map(coursePart =><Part coursePart={coursePart}/>)}
    </div>
  )
}
//
const Total : React.FC<{courseParts: CoursePart[]}> = ({courseParts}) => {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
}

const App: React.FC = () => {
  const courseName = "Half Stack application development";
 

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
