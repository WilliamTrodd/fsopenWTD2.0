import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Notification = () => {
  const notification = useSelector(state => state.notif)

  if (notification === null) {
    return null
  }

  return notification.style === 'error'
    ? (<Alert severity="error">{notification.message}</Alert>)
    : (<Alert serverity="success">{notification.message}</Alert>)

}

export default Notification