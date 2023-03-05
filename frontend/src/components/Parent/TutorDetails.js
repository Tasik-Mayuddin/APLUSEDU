

const TutorDetails = ({ name, summary, experience, occupation, education, tutor_id, onClick }) => {
  return (
    <div className="tutor-details"> 
        <h2>{name}</h2>
        {experience&&<h4>{experience} years of experience | {occupation} | {education}</h4>}
        <p>{summary}</p>
        <button onClick={()=>onClick(tutor_id)}>Check Availability</button>
    </div>
  )
}

export default TutorDetails