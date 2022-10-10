import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState:null,
  reducers:{
    updateNotif(state, action) {
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
    setTimeout(() => {
      dispatch(clearNotif())
    },time*1000)
  }
}

export default notificationSlice.reducer