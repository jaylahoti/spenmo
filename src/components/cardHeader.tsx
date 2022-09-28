import AddEditBox from "./addEditBox"

type Props = {
  title: string,
  setEditIndex: (childIndex: number) => void
  setEditParentIndex: (parentIndex: number) => void
  editIndex: number
  editParentIndex: number
  parentIndex: number
  addEdit: (text: string, childIndex: number, parentIndex: number, cardType: string) => void
  noEdit: () => void
}

function CardHeader({title, parentIndex, editIndex, editParentIndex, 
    addEdit, setEditParentIndex, setEditIndex, noEdit}:Props){
  return(
    <>
      {editIndex === -1 && editParentIndex === parentIndex ?
        <AddEditBox onClick={addEdit} parentIndex={parentIndex} placeholder={title}
            childIndex={-1} cardType='maincard' noEdit={noEdit}/>
          :
        <h2 className="text-center" onDoubleClick={() => {setEditParentIndex(parentIndex); setEditIndex(-1)}}>{title}</h2>
      }
    </>
  )
}

export default CardHeader