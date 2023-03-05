import { useState, useEffect } from "react"
import { fetchAPI, fetchPostAPI } from "../../functions"
import { useParams } from 'react-router-dom'
import TutorDetails from "./TutorDetails"
import TutorAvailability from "./TutorAvailability"

const TutorQuery = () => {
	const { slug } = useParams()

	const [subjects, setSubjects] = useState([])
	const [level, setLevel] = useState('')
	const [currentSubject, setCurrentSubject] = useState('')
	const [tutors, setTutors] = useState([])
	const [tutorTime, setTutorTime] = useState([])
	const [currentTutorId, setCurrentTutorId] = useState('')
	const [toggleView, setToggleView] = useState(false)

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

	const onCheck = async (tutor_id) => {
		setCurrentTutorId(tutor_id)
		const fetchAvailability = await fetchAPI(`tutors/${tutor_id}/availability`)
		setTutorTime(fetchAvailability)
		setToggleView(true)
	}

	const onRequest = (e, toPost) => {
        e.preventDefault()
        fetchPostAPI("tutor-request", toPost)
		setToggleView(false)
    }

	return (
		<>
			{subjects.map((subj, id)=>(
				<button key={id} onClick={()=>setCurrentSubject(subj)}>{subj.name}</button>
			))}

			{tutors.map((tutor, id)=>(
				<TutorDetails 
					key={id} 
					name={tutor.username} 
					summary={tutor.tutorprofile.summary} 
					experience={tutor.tutorprofile.experience_years}
					occupation={tutor.tutorprofile.occupation}
					education={tutor.tutorprofile.education}
					tutor_id = {tutor.id}
					onClick={onCheck}
				/>
			))}
			{toggleView&&<TutorAvailability availability={tutorTime} tutor_id={currentTutorId} onRequest={onRequest} />}
		</>
	)
}

export default TutorQuery