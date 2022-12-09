const Notify = ({errorMessage, setErrorMessage}) => {

  if (!errorMessage) {
    return null
  }
  return (
    <div className="flex w-full h-full fixed bg-slate-100 bg-opacity-70">
      <div className="flex
                      flex-row
                      p-6 
                      w-96
                      mx-auto
                      my-auto
                      rounded-xl 
                      shadow-lg
                      space-x-2
                      items-center
                      bg-white 
                      z-50" >
        <div className="flex w-4/5 text-red-400">{errorMessage}</div>
        <button className="flex w-1/5 p-2 rounded-xl bg-slate-200 text-center justify-center" onClick={() => setErrorMessage(null)}>OK</button>
      </div>
    </div>
  )
}

export default Notify;