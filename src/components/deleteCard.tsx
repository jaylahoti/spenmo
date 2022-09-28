import { useEffect, useState } from "react"

type Props = {
  dataLength: number
  deleteClick: (parentIndex: number, childIndex: number) => void
  parentIndex: number
}

// disabled={dataLength <= 1}

function DeleteCard({dataLength, deleteClick, parentIndex} : Props){

  return(
    <div className="m-15 text-center">
      <button disabled={dataLength <= 1} className="cardDelete" data-testid="delete"
        onClick={() => deleteClick(-1, parentIndex)}>Delete</button>
    </div>
  )
}

export default DeleteCard