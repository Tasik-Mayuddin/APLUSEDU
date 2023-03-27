import PropTypes from 'prop-types'

const ButtonBig = ({ color, text, onClick }) => {
  return (
    <button 
        onClick={onClick} 
        className='btn-big'
    >
        {text}
    </button>
  )
}

ButtonBig.defaultProps = {
    color: 'steelblue',
}

ButtonBig.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
}

export default ButtonBig
