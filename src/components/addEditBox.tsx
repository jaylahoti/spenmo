import { useEffect, useRef, useState } from "react";

type Props = {
  onClick: (text: string, childIndex: number, parentIndex: number, cardType: string) => void
  parentIndex: number
  childIndex?: number
  placeholder?: string
  typeVal?: string
  cardType?: string
  noEdit: () =>  void
}

function AddEditBox({ onClick, childIndex = -1, parentIndex, placeholder = '', typeVal = '', 
  cardType = 'addcard', noEdit }: Props){
  const inputRef = useRef<HTMLInputElement>(null)
  const [showError, setShowError] = useState(false)
  const [oldValue, setOldValue] = useState('')

  useEffect(() => {
    if(inputRef.current){
      setOldValue(inputRef.current.value)
    }
  },[])

  function addEdit(){
    if(inputRef.current !== null && inputRef.current.value.length > 0){
      // Only Update If necessary improves time complexity
      if(oldValue !== inputRef.current.value){
        onClick(inputRef.current.value, childIndex, parentIndex, cardType)
      }else{
        noEdit()
      }
      inputRef.current.value = ''
    }else{
      setShowError(true)
    }
  }

  useEffect(() => {
    if(showError){
      setTimeout(() => {
        setShowError(false)
      }, 3000)
    }
  },[showError])

  return(
    <>
      <div className="d-flex justify-between">
        <input className="inputDesign" ref={inputRef} defaultValue={placeholder}
          type="text" data-testid="text-input"/>
        <button onClick={addEdit}>{typeVal !== 'Add' ? 'Update' : 'Add'}</button>
      </div>
      {showError && (
        <div className="show-error show-msg">Please input some data</div>
      )}
    </>
  )
}

export default AddEditBox