import { createSlice } from '@reduxjs/toolkit'
let timerID

const notifSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotif(state, action) {
      if(timerID){
        clearTimeout(timerID)
      }
      const notif = action.payload
      return notif
    },
    // eslint-disable-next-line no-unused-vars
    clearNotif(state, action) {
      return null
    }
  }
})

export const { setNotif, clearNotif } = notifSlice.actions

export const setNotification = (text, style, time) => {
  const notifObj = { message:text, style:style }
  return dispatch => {
    dispatch(setNotif(notifObj))
    timerID = setTimeout(() => {
      dispatch(clearNotif())
    }, time*1000)
  }
}

export default notifSlice.reducer