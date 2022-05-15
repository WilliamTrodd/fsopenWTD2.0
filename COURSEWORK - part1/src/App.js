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

const History = ({allClicks}) => {
  if (allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  else {
    return (
      <div>
        button press history: {allClicks.join(' ')}
      </div>
    )
  }
}


const App = (props) => {
  const [ counter, setCounter ] = useState(0)
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const age = 10
  const incOne = () => setCounter(counter+1)
  const setToZero = () => setCounter(0)
  const decOne = ()  => setCounter(counter-1)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  const name = "Will"
  return (
    <>
      <div>
        <h1>Greetings</h1>
        <Display counter={counter} />
        <Button onClick={incOne} text='plus' />
        <Button onClick={decOne} text='minus' />
        <Button onClick={setToZero} text='zero' />
        <Hello name={name} age={age +16}/>
        <Hello name="Tester" age={age}/>
      </div>

      <div>
        <History allClicks={allClicks} />
        {left}
        <Button onClick={handleLeftClick} text='left' />
        <Button onClick={handleRightClick} text='right' />
        {right}
      </div>
    </>
  )
}

export default App