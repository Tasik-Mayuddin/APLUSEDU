import { useState, useEffect } from "react"
import { fetchAPI } from "../../functions"
import { useParams } from 'react-router-dom'
import TutorDetails from "./TutorDetails"

const TutorQuery = () => {
	const { slug } = useParams()

	const [subjects, setSubjects] = useState([])
	const [level, setLevel] = useState('')
	const [currentSubject, setCurrentSubject] = useState('')
	const [tutors, setTutors] = useState([])

	// fetches overall information of the student, sets states of level and subjects
	useEffect(() => {
		const getChild = async () => {
      const fetchChild = await fetchAPI(`children/${slug}`)
      setSubjects(fetchChild.subjects)
			setLevel(fetchChild.level)
    }
		getChild()
	}, [slug])

	// when subjects gets updated, sets the default state of currentSubject to the first subject
	useEffect(()=>{
		Boolean(subjects.length)&&setCurrentSubject(subjects[0])
	}, [subjects])

	// when there is an instance/change of currentSubject, sets the state of tutors to the corresponding list of tutors
	useEffect(()=>{
		if (Boolean(currentSubject))
			{const getTutors = async () => {
				const fetchTutors = await fetchAPI(`tutors?subject=${currentSubject.id}&level=${level.id}`)
				setTutors(fetchTutors)
    	}
		getTutors()}
	}, [currentSubject, level])

	console.log("test")
// test

  return (
    <>
        {subjects.map((subj, id)=>(
					<button key={id} onClick={()=>setCurrentSubject(subj)}>{subj.name}</button>
				))}
				{tutors.map((tutor, id)=>(
					<TutorDetails key={id} name={tutor.username} summary={tutor.summary} />
				))}
				

    </>
  )
}

export default TutorQuery