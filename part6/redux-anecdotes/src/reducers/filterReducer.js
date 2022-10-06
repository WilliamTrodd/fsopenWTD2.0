import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers:{
    setFilter(state, action){
      const filter = action.payload
      console.log(filter)
      return filter
    }
  }
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer