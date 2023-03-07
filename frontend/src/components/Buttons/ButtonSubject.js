import React from 'react'

const ButtonSubject = ({ text, onClick, current }) => {
  return (
    <button 
    
    className={current?'btn-subject current':'btn-subject'} 
    onClick={onClick}
    >
        {text}
    </button>
  )
}

export default ButtonSubject