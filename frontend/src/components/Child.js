import { useParams } from 'react-router-dom'
import ButtonBig from './ButtonBig'
import { useEffect, useState } from 'react'
import AddOrEditChild from './AddOrEditChild'
import { fetchAPI, fetchPutAPI } from '../functions'
import StudentAllocation from './StudentAllocation'

const Child = () => {
  const { slug } = useParams();
	const [toggleEdit, setToggleEdit] = useState(false)
	const [child, setChild] = useState([])
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
    console.log(data)
    setChild(data)
  }

  return (
    <>
			<h1>{child.name}</h1>
			<button onClick={()=>(setToggleEdit(true))}>Edit</button>
			{toggleEdit&&<AddOrEditChild onSubmit={onSubmit} editName={child.name} editLevel={child.level} editSubjects={child.subjects} />}

			<ButtonBig text={"Look for a Tutor!"} />
			<h2>Allocations</h2>
			{allocations.map((item, id)=>(
				<StudentAllocation key={id} allocationDetails={item} />
			))}
		</>
  )
}

export default Child