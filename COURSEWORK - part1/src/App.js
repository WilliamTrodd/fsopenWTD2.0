import { useState } from 'react'

const Hello = ({name,age}) => {
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>Hello {name}, you are {age} years old</p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

const Display = ({counter}) => <div>{counter}</div>

const Button = ({onClick, text}) => (
    <button onClick={onClick}>
      {text}
    </button>
  )


const App = (props) => {
  const [ counter, setCounter ] = useState(0)
  const age = 10
  const incOne = () => setCounter(counter+1)
  const setToZero = () => setCounter(0)
  const decOne = ()  => setCounter(counter-1)

  const name = "Will"
  return (
    <div>
      <h1>Greetings</h1>

      <Display counter={counter} />
      <Button onClick={incOne} text='plus' />
      <Button onClick={decOne} text='minus' />
      <Button onClick={setToZero} text='zero' />
      <Hello name={name} age={age +16}/>
      <Hello name="Tester" age={age}/>
    </div>
  )
}

export default App