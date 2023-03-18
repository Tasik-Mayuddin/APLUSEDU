
const ButtonSmall = ({ color, text, onClick }) => {
  
  return (
    <button 
    className={`btn-small ${color?`btn-${color}`:''}`}            
    onClick={onClick}
    type={'button'}
    >
        {text}
    </button>
  )
}

export default ButtonSmall