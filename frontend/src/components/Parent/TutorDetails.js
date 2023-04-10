import ButtonSmall from "../Buttons/ButtonSmall"
import { backendDir } from "../../functions"


const TutorDetails = ({ name, summary, experience, occupation, education, tutor_id, onClick, pictureUrl }) => {
  return (
    <div className="tutor-details">
      <div className="tutor-details-left">
        <h2>{name}</h2>
        <img src={`${pictureUrl}`} alt="Avatar" class="avatar" />
        {experience&&
        <ul>
          <li>{experience} years of tutoring</li>
          <li>Occupation: {occupation}</li>
          <li>Graduated from {education}</li>
        </ul>}
        </div> 

        <div className="tutor-details-right">
          <div className="tutor-details-right-top">
            <p>{summary}</p>
          </div>
          <div className="tutor-details-right-bot">
            <ButtonSmall text={'Check Availability'} onClick={()=>onClick(tutor_id)}></ButtonSmall>
          </div>
        </div>
        
    </div>
  )
}

export default TutorDetails