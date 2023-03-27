import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import AddOrEditChild from './AddOrEditChild'
import { fetchAPI, fetchPostAPI, fetchPutAPI } from '../../functions'
import StudentAllocation from './StudentAllocation'
import ButtonSmall from '../Buttons/ButtonSmall'
import TutorQuerySamePage from './TutorQuerySamePage'

const Child = () => {
  const { slug } = useParams();
	const [toggleEdit, setToggleEdit] = useState(false)
	const [child, setChild] = useState('')
	const [allocations, setAllocations] = useState([])

	useEffect(() => {
		const getChild = async () => {
			const fetchChild = await fetchAPI(`children/${slug}`)
			setChild(fetchChild)
		}

		const getAllocations = async () => {
			const fetchAllocations = await fetchAPI(`children/${slug}/allocations`)
			setAllocations(fetchAllocations)
		}
		
		getChild()
		getAllocations()
  	}, [slug])

	//when user submits the form in AddOrEditChild
	const onSubmit = async (e, toPost) => {
    e.preventDefault()

    const data = await fetchPutAPI(`children/${slug}`, toPost)
    setChild(data)
	setToggleEdit(false)
  }

  	const onRequest = async (e, hideModal, currentTutorId, toPost) => {
		e.preventDefault()
		await fetchPostAPI(`tutors/${currentTutorId}/request`, toPost)
		hideModal()

		// fetch updated allocation list
		const fetchAllocations = await fetchAPI(`children/${slug}/allocations`)
		setAllocations(fetchAllocations)
	}	


  return (
    <>
			<div className='child-header'>
				<h1>{child.name}</h1>
				<ButtonSmall text={'Edit Child Details'} color={'blue'} onClick={()=>(setToggleEdit(true))}></ButtonSmall>
			</div>
			{toggleEdit&&<AddOrEditChild onSubmit={onSubmit} editName={child.name} editLevel={child.level} editSubjects={child.subjects} hideModal={()=>setToggleEdit(false)} />}
			
			<div className='child-main'>

				<div className='child-left'>
					{child&&<TutorQuerySamePage subjects={child.subjects} level={child.level} child_id={slug} onRequest={onRequest} />}
				</div>


				<div className='child-right'>
					<h2>Allocations</h2>
					<div className='student-allocations'>
						{allocations.map((item, id)=>(
							<StudentAllocation key={id} allocationDetails={item} />
						))}
					</div>
				</div>
			</div>
		</>
  )
}

export default Child