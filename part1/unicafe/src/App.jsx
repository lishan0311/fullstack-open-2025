import { useState } from 'react'

const Button = ({onClick, text}) => 
  <button onClick={onClick}>{text}</button>

const StatisticLine = ({text, value}) =>{
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) =>{
  const total = props.good + props.neutral + props.bad
  const average = ((props.good*1) + (props.bad*-1)) / total
  const positive = props.good / total * 100

  if (props.good === 0 && props.neutral === 0 && props.bad ===0){
    return(
      <div>
        <h2>Statistics</h2>
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text='good' value={props.good} />
          <StatisticLine text='neutral' value={props.neutral} />
          <StatisticLine text='bad' value={props.bad} />
          <StatisticLine text='all' value={total} />
          <StatisticLine text='average' value={average} />
          <StatisticLine text='positive' value={positive + " %"} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const clickGood = () => setGood(good+1)
  const clickNeutral = () => setNeutral(neutral+1)
  const clickBad = () => setBad(bad+1)

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={clickGood} text='good' />
      <Button onClick={clickNeutral} text='neutral' />
      <Button onClick={clickBad} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App