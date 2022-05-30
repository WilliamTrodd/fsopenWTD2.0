const Notification = ({message, styleName}) => {
    if (message === null) {
        return null
    }
    return(
        <div className={styleName}>
            {message}
        </div>
    )
}

export default Notification