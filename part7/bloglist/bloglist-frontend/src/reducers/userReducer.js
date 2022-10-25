import { createSlice } from '@reduxjs/toolkit'
import { setNotification } from './notifReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    // eslint-disable-next-line no-unused-vars
    clearUser(state, action) {
      return null
    }
  }
})

export const { setUser, clearUser } = userSlice.actions

export const logout = () => {
  return dispatch => {
    try{
      dispatch(clearUser())
      dispatch(setNotification('Logged out', 'notification', 10))
    } catch(exception) {
      dispatch(setNotification('Couldn\'t log user out', 'error', 10))
    }
  }
}

export const login = (user) => {
  return dispatch => {
    dispatch(setUser(user))
  }
}

export default userSlice.reducer