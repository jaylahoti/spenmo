import { useRef, useState } from "react";
import AddEditBox from "./addEditBox";

type Props = {
  parentIndex: number
  childIndex: number
  deleteClick: (parentIndex: number, childIndex: number) => void
  addEdit: (text: string, childIndex: number, parentIndex: number, cardType: string) => void
  setEditIndex: (childIndex: number) => void
  setEditParentIndex: (parentIndex: number) => void
  noEdit: () => void
  editIndex: number
  editParentIndex: number
  name: string
}

function SubCard({name, deleteClick, parentIndex, childIndex, addEdit,  noEdit,
    editIndex, setEditIndex, setEditParentIndex, editParentIndex} : Props){

  return(
    <>
      <div>
        {editIndex === childIndex && editParentIndex === parentIndex ?
          <AddEditBox onClick={addEdit} parentIndex={parentIndex} placeholder={name}
            childIndex={childIndex} cardType='subcard' noEdit={noEdit}/>
        :
          <div className="d-flex justify-between">
            <div>{name}</div>
            <div>
              <button onClick={() => {setEditIndex(childIndex); setEditParentIndex(parentIndex)}}>Edit</button>
              <button className="ml-2" onClick={() => deleteClick(childIndex, parentIndex)}>Delete</button>
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default SubCard