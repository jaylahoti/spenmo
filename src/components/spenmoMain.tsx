import AddEditBox from './addEditBox';
import SubCard from './subCard';
import CardHeader from './cardHeader';
import DeleteCard from './deleteCard';
import { useEffect, useRef, useState } from 'react';

const cardData = [{
  title: 'Grocery',
  children: [{
    name: 'Bread'
  },
  {
    name: 'Pizza'
  }]
}]


//Please Note:- I have used array architecture above but Using Object structure below will be more 
//faster as compared to traversing thorough array above

// const cardData = {
//   grocery: {
//     children:{
//       bread: {
//         name: 'Bread',
//       },
//       pizza: {
//         name: 'Pizza'
//       }
//     }
//   }
// }

//We can just do Object.entries.map and solve solution.

//I have solved using array logic below due lot of work and tight schedule. :) but I can solve using objects as well.

function SpenmoMain(){
  const [mainData, setMainData] = useState(cardData)
  const [editIndex, setEditIndex] = useState(-1)
  const [editParentIndex, setEditParentIndex] = useState(-1)
  const [showMsg, setShowMsg] = useState('')

  const dragItem = useRef();
  const dragOverItem = useRef();
  const dragNewIndex = useRef();
  const dragCurrentIndex = useRef();

  function ensure<T>(argument: T | undefined | null, message: string = 'This value was promised to be there.'): T {
    if (argument === undefined || argument === null) {
      throw new TypeError(message);
    }
    return argument;
  }

  useEffect(() => {
    if(showMsg.length > 0){
      setTimeout(() => {
        setShowMsg('')
      }, 2000)
    }
  },[showMsg])

  function addEdit(text:string, childIndex:number, parentIndex: number, cardType:string){
    if(cardType === 'maincard'){
      ensure(mainData.find((_x, i) => i == parentIndex)).title = text
      setEditIndex(-1)
      setEditParentIndex(-1)
      setShowMsg('Update Succesfull')
    }else if(cardType == 'subcard' && mainData[parentIndex].children){
        ensure(mainData[parentIndex].children.find((_x, i) => i == childIndex)).name = text
        setEditIndex(-1)
        setEditParentIndex(-1)
        setShowMsg('Update Succesfull')
    }else if(cardType == 'addcard'){
      if(mainData[parentIndex].children){
        mainData[parentIndex].children.push({name: text})
      }else{
        mainData[parentIndex].children = [{name: text}]
      }
      setShowMsg('Add Succesfull')
    }
    setMainData([...mainData])
  }
  
  // If no update made just close input box of edit
  function noEdit(){
    setEditIndex(-1)
    setEditParentIndex(-1)
  }

  function deleteClick(childIndex:number, parentIndex: number){
    if(childIndex !== -1){
      mainData[parentIndex].children.splice(childIndex, 1)
    }else{
      mainData.splice(parentIndex, 1)
    }
    setShowMsg('Delete Succesfull')
    setMainData([...mainData])
  }

  function addNewCard(){
    mainData.push({
      title: 'New Card',
      children: []
    })
    setMainData([...mainData])
  }
   
  const dragStart = (e:any, position:any, currentIndex:any) => {
    dragItem.current = position;
    dragCurrentIndex.current = currentIndex
  };
   
  const dragEnter = (e:any, position:any) => {
    dragOverItem.current = position;
    dragNewIndex.current = e.target.id;
  };
   
  const drop = (e:any) => {
    if(dragItem.current !== undefined && dragOverItem.current !== undefined && 
      dragNewIndex.current !== undefined && dragCurrentIndex.current !== undefined){

      const dragItemContent = mainData[dragCurrentIndex.current].children[dragItem.current];

      if(dragNewIndex.current !== dragCurrentIndex.current && mainData[parseInt(dragNewIndex.current)]){
        mainData[dragCurrentIndex.current].children.splice(dragItem.current, 1)
        mainData[parseInt(dragNewIndex.current)].children.push(dragItemContent)
      }else{
        mainData[dragCurrentIndex.current].children.splice(dragItem.current, 1);
        mainData[dragCurrentIndex.current].children.splice(dragOverItem.current, 0, dragItemContent);
      }

      dragItem.current = undefined;
      dragOverItem.current = undefined;
      setMainData([...mainData]);
    }
  };

  return(
    <div className="container d-flex">
      {mainData.map((data, parentIndex) => {
        return(
          <div className="main-card" key={parentIndex} >
            <CardHeader title={data.title} parentIndex={parentIndex} setEditIndex={setEditIndex}
              setEditParentIndex={setEditParentIndex} editIndex={editIndex} addEdit={addEdit} 
              editParentIndex={editParentIndex} noEdit={noEdit}/>
            {data.children.map((d, childIndex) => {
              return(
                <div className="sub-card" key={childIndex} onDragStart={(e) => dragStart(e, childIndex, parentIndex)}
                  onDragEnter={(e) => dragEnter(e, childIndex)} onDragEnd={(e) => {drop(e);e.preventDefault()}}
                  onDragOver={(e) => e.preventDefault()} draggable id={''+parentIndex}>
                  <SubCard name={d.name} deleteClick={deleteClick} parentIndex={parentIndex}
                    addEdit={addEdit} editIndex={editIndex} setEditIndex={setEditIndex}
                    editParentIndex={editParentIndex} setEditParentIndex={setEditParentIndex}
                    childIndex={childIndex} noEdit={noEdit}/>
                </div>
            )})}
              <div className="hidden-sub-card" onDragEnter={(e) => dragEnter(e, -1)} 
                id={parentIndex.toString()} onDragStart={(e) => dragStart(e, -1, parentIndex)}
                 onDragEnd={(e) => {drop(e);e.preventDefault()}}
                 onDragOver={(e) => e.preventDefault()}></div>
            <div className='m-15'>
              <AddEditBox onClick={addEdit} parentIndex={parentIndex} typeVal="Add" noEdit={noEdit}/>
            </div>
            <DeleteCard dataLength={mainData.length} deleteClick={deleteClick} parentIndex={parentIndex}/>
          </div>
        )
      })}
      <button className='mainadd-button' onClick={addNewCard}>+</button>
      {showMsg.length > 0 && (
        <div className="show-sucess show-msg">{showMsg}</div>
      )}
    </div>
  )
}

export default SpenmoMain