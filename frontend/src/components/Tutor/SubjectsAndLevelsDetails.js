import React from 'react'
import { RxCross1 } from "react-icons/rx";

const SubjectsAndLevelsDetails = ({ subjectAndLevels, onDelete }) => {
  return (
    <div className='subjlvl-details'>
      <div className='subjlvl-details-header'>
        <h2>{subjectAndLevels.subject}</h2>
        <button className='icon-button' onClick={()=>onDelete(subjectAndLevels.subject)}><RxCross1 size={'24px'} /></button>
      </div>
      <div>
        <h3>Levels: {subjectAndLevels.levels.map(item=>item).join(', ')}</h3>
      </div>
    </div>
  )
}

export default SubjectsAndLevelsDetails