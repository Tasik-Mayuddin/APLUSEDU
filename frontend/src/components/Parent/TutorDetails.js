import ButtonSmall from "../Buttons/ButtonSmall"


const TutorDetails = ({ name, summary, experience, occupation, education, tutor_id, onClick }) => {
  return (
    <div className="tutor-details"> 
        <h2>{name}</h2>
        {experience&&<h4>{experience} years of experience | {occupation} | {education}</h4>}
        <p>{summary}</p>
        <ButtonSmall text={'Check Availability'} onClick={()=>onClick(tutor_id)}></ButtonSmall>
    </div>
  )
}

export default TutorDetails