import { useState } from 'react'

const Heading = ({heading}) => <h1>{heading}</h1> 

const StatisticLine = ({label,value}) => {
  return(<tr><td>{label}:</td><td>{value}</td></tr>)
}

const Statistics = (props) => {
  const good=props.good
  const bad=props.bad
  const neutral=props.neutral
  const total = good+bad+neutral
  if (total===0){
    return(<p>No feedback given</p>)
  }
  return(
    <div>
      <table>
        <tbody>
          <StatisticLine label='good' value={good} />
          <StatisticLine label='neutral' value={neutral} />
          <StatisticLine label='bad' value={bad} />
          <StatisticLine label='all' value={total} />
          <StatisticLine label='average' value={(good-bad)/total} />
          <StatisticLine label='positive' value={String(good/total*100) + ' %'}/>
        </tbody>
      </table>
    </div>
  )
}

const Button = ({eventHandler, label}) => <button onClick={eventHandler}>{label}</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodHandle = () => setGood(good+1)
  const neutHandle = () => setNeutral(neutral+1)
  const badHandle = () => setBad(bad+1)

  return (
    <>
      <div>
        <Heading heading='Give Feedback' />
      </div>
      <div>
        <Button eventHandler={goodHandle} label='Good' />
        <Button eventHandler={neutHandle} label='Neutral' />
        <Button eventHandler={badHandle} label='Bad' />
      </div>
      <div>
        <Heading heading='Statistics' />
      </div>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </>
  )
}

export default App