const ButtonSmall = ({ color, text, onClick, Icon }) => {
  
  return (
    <button 
    className={`btn-small ${color?`btn-${color}`:''}`}            
    onClick={onClick}
    type={'button'}
    >
        {Icon}
        {text}
    </button>
  )
}


export default ButtonSmall

