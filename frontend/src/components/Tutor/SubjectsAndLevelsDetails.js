import React from 'react'
import ButtonSmall from '../Buttons/ButtonSmall'

const SubjectsAndLevelsDetails = ({ subjectAndLevels, onDelete }) => {
  return (
    <div className='subjlvl-details'>
      <div className='subjlvl-details-header'>
        <h2>{subjectAndLevels.subject}</h2>
        <ButtonSmall text={'Delete'} onClick={()=>onDelete(subjectAndLevels.subject)} />
      </div>
      <div>
        <h3>Levels: {subjectAndLevels.levels.map(item=>item).join(', ')}</h3>
      </div>
    </div>
  )
}

export default SubjectsAndLevelsDetails