import ButtonSmall from "../Buttons/ButtonSmall"


const TutorDetails = ({ name, summary, experience, occupation, education, tutor_id, onClick }) => {
  return (
    <div className="tutor-details">
      <div className="tutor-details-left">
        <h2>{name}</h2>
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