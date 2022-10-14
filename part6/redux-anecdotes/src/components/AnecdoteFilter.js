import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const AnecdoteFilter = (props) => {

  const filterHandler = (event) => {
    props.setFilter(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      <input onChange={filterHandler}/>
    </div>
  )
}


const mapDispatchToProps = {
  setFilter
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteFilter)