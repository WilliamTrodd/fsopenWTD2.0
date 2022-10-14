import { createSlice } from '@reduxjs/toolkit'
let timerID


const notificationSlice = createSlice({
  name: 'notification',
  initialState:null,
  reducers:{
    updateNotif(state, action) {
      if(timerID){
        clearTimeout(timerID)
      }
      const notif = action.payload
      return notif
    },
    clearNotif(state, action) {
      return null
    }
  }
})

export const { updateNotif, clearNotif } = notificationSlice.actions

export const setNotification = (text, time) => {
  return dispatch => {
    dispatch(updateNotif(text))
    timerID = setTimeout(() => {
      dispatch(clearNotif())
    },time*1000)
  }
}

export default notificationSlice.reducer