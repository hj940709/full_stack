import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => { 
    console.log(props)
    const { onClick, text, value } = props
    return (
      <button onClick={()=>onClick(value+1)}>
        {text}
      </button>
    )
  }

const Statistics = (props) => {
    const {text, value} = props

    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    if (good + neutral + bad === 0)
        return (
            <div>
            <h1>Give feedback</h1>
            <div>
                <Button onClick={setGood} text={"Good"} value={good}/>
                <Button onClick={setNeutral} text={"Neutral"} value={neutral}/>
                <Button onClick={setBad} text={"Bad"} value={bad}/>
            </div>
            <h1>Statistics</h1>
            <p>No feedback given</p>
        </div>
        )

    return (
        <div>
            <h1>Give feedback</h1>
            <div>
                <Button onClick={setGood} text={"Good"} value={good}/>
                <Button onClick={setNeutral} text={"Neutral"} value={neutral}/>
                <Button onClick={setBad} text={"Bad"} value={bad}/>
            </div>
            <h1>Statistics</h1>
            <table>
                <thead></thead>
                <tbody>
                    <Statistics text={"Good"} value={good}/>
                    <Statistics text={"Neutral"} value={neutral}/>
                    <Statistics text={"Bad"} value={bad}/>
                    <Statistics text={"All"} value={good + neutral + bad}/>
                    <Statistics text={"Avg"} value={(good - bad) / (good + neutral + bad) }/>
                    <Statistics text={"Positive"} value={good / (good + neutral + bad) * 100 + "%"}/>
                </tbody>
                <tfoot></tfoot>
            </table>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

