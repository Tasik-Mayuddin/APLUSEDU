import ButtonBig from '../Buttons/ButtonBig'
import { Link } from 'react-router-dom'

const ParentDash = () => {

  return (
    <div>
				<Link to="/children">
        	<ButtonBig text={"My Children"} />
				</Link>
        <ButtonBig text={"Chat with Tutors"} />
    </div>
  )
}

export default ParentDash