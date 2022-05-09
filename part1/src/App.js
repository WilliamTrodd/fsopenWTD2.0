const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

const App = () => {
  const name = "Will"
  const age = 10
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name={name} age={age +16}/>
      <Hello name="Tester" age={age}/>
    </div>
  )
}

export default App