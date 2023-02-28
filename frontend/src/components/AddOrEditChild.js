import { useState, useEffect } from 'react'
import { fetchAPI, fetchPostAPI } from '../functions'
import CheckboxMultiple from './CheckboxMultiple'
import DropdownMenu from './DropdownMenu'


const AddOrEditChild = ({ onSubmit }) => {
	const [name, setFormName] = useState('')
	const [level, setFormLevel] = useState('')
	const [subjects, setFormSubjects] = useState([])

  const [levelList, setLevelList] = useState([])
  const [subjectList, setSubjectList] = useState([])

  useEffect(() => {
    const getLevelList = async () => {
      const fetchLevelList = await fetchAPI('level-list/')
      setLevelList(fetchLevelList)
    }
    
    const getSubjectList = async () => {
      const fetchSubjectList = await fetchAPI('subject-list/')
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
              <input type="text" placeholder="Insert your child's name" onChange={(e) => setFormName(e.target.value)} />
            </div>
            <div className="form-control">
              <DropdownMenu label = {"Level: "} placeholder = {"Select Difficulty"} list = {levelList} onChange={(e) => setFormLevel(e.target.value)} />
            </div>
						<div className="form-control">
              <CheckboxMultiple label = {"Subject: "} name = {"subject"} list = {subjectList} setState={(data) => setFormSubjects(data)} /> 
            </div>
            <input type='submit' value='Add Child' className="btn btn-block"/>
        </form>
    </div>
  )
}

export default AddOrEditChild