import react from 'react'
const Filter = (props) =>(
    <p>
        filter shown with: <input value={props.filterValue} onChange={props.handleFilterChange}/>
    </p>
)

export default Filter