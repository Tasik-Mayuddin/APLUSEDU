
const ButtonSmall = ({ color, text, onClick }) => {
  
  return (
    <button 
    className={'btn-small'} 
    onClick={onClick}
    >
        {text}
    </button>
  )
}

export default ButtonSmall