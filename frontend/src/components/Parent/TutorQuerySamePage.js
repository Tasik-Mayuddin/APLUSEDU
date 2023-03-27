import { useState, useEffect } from "react"
import { fetchAPI, fetchPostAPI } from "../../functions"
import TutorDetails from "./TutorDetails"
import TutorAvailability from "./TutorAvailability"
import ButtonSubject from "../Buttons/ButtonSubject"
import React from "react"

const TutorQuerySamePage = ({ subjects, level, child_id, onRequest }) => {

	const [currentSubject, setCurrentSubject] = useState('')
	const [tutors, setTutors] = useState([])
	const [tutorTime, setTutorTime] = useState([])
	const [currentTutorId, setCurrentTutorId] = useState('')
	const [toggleView, setToggleView] = useState(false)


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

	return (
		<>
			<div className="tutor-query-header">
				{subjects.map((subj, id)=>(
					<React.Fragment key={id}>
						{currentSubject===subj?
						<ButtonSubject current='true' text={subj.name} key={id} onClick={()=>setCurrentSubject(subj)}></ButtonSubject>:
						<ButtonSubject text={subj.name} key={id} onClick={()=>setCurrentSubject(subj)}></ButtonSubject>
						}
						
					</React.Fragment> 
				))}
			</div>
			<div className="tutor-details-wrap">
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
			</div>
			{toggleView&&
			<TutorAvailability 
				availability={tutorTime} 
				child_id={child_id} 
				subject={currentSubject} 

				onRequest={onRequest} 
				currentTutorId={currentTutorId}

				hideModal={()=>setToggleView(false)} 
			/>}
		</>
	)
}

export default TutorQuerySamePage