const FormEntry = ({value, placeholder, stateHandler, type}) => (
  <>
  <div className="scroll-py-2 ">{placeholder}</div>
  <input className="rounded-lg 
                    w-96
                    px-2 
                    py-1 
                    flex 
                    my-2 
                    outline-none 
                    ring-1 
                    ring-slate-200 
                    bg-slate-100 
                    focus:bg-blue-50 
                    focus:ring-2 
                    focus:ring-blue-500 
                    focus:outline-1 
                    focus:outline-blue-300" 
          value={value}
          type={type}
          placeholder={placeholder}
          onChange={(event) => stateHandler(event.target.value)}
            />
  </>
)

export default FormEntry