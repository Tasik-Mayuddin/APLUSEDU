import PropTypes from 'prop-types'

const ButtonSmall = ({ color, text, onClick, Icon, type }) => {
  
  return (
    <button 
    className={`btn-small ${color?`btn-${color}`:''}`}            
    onClick={onClick}
    type={type}
    >
        {Icon}
        {text}
    </button>
  )
}

ButtonSmall.defaultProps = {
  type: 'button',
}

ButtonSmall.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  type: PropTypes.string,
}

export default ButtonSmall

