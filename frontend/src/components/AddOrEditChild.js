import { useState, useEffect } from 'react'
import { fetchAPI } from '../functions'
import CheckboxMultiple from './CheckboxMultiple'
import DropdownMenu from './DropdownMenu'


const AddOrEditChild = ({ onSubmit, editName, editLevel, editSubjects }) => {
	const [name, setFormName] = useState(editName?editName:'')
	const [level, setFormLevel] = useState(editLevel?editLevel:'')
	const [subjects, setFormSubjects] = useState(editSubjects?editSubjects:[])
 
  const [levelList, setLevelList] = useState([])
  const [subjectList, setSubjectList] = useState([])

  useEffect(() => {
    const getLevelList = async () => {
      const fetchLevelList = await fetchAPI('levels')
      setLevelList(fetchLevelList)
    }
    
    const getSubjectList = async () => {
      const fetchSubjectList = await fetchAPI('subjects')
      setSubjectList(fetchSubjectList)
    }

    
    getLevelList()
    getSubjectList()
  }, [])



  return (
    <div className="popup-block">
        <form className="add-edit-form" onSubmit={(e)=>onSubmit(e, { name, level, subjects })}>
            <div className="form-control">
              <label>Name</label>
              <input type="text" placeholder="Insert your child's name" onChange={(e) => setFormName(e.target.value)} defaultValue={name} />
            </div>
            <div className="form-control">
              <DropdownMenu label = {"Level: "} placeholder = {"Select Difficulty"} list = {levelList} onChange={(e) => setFormLevel(Number(e.target.value))} oriSelected={level} />
            </div>
						<div className="form-control">
              <CheckboxMultiple label = {"Subject: "} name = {"subject"} list = {subjectList} setState={(data) => setFormSubjects(data)} oriChecked={subjects} /> 
            </div>
            <input type='submit' value={editName?'Save Changes':'Add Child'} className="btn btn-block"/>
        </form>
    </div>
  )
}

export default AddOrEditChild