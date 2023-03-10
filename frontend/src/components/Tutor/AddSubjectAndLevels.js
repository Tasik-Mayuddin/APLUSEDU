import { useState,useEffect } from "react"
import { fetchAPI } from "../../functions"
import DropdownMenu from "../Inputs/DropdownMenu"
import CheckboxMultiple from "../Inputs/CheckboxMultiple"

const AddSubjectAndLevels = ({ onSubmit, hideModal }) => {

    const [levelList, setLevelList] = useState([])
    const [subjectList, setSubjectList] = useState([])
    const [subject, setSubject] = useState('')
    const [levels, setLevels] = useState([])

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
        <>
            <div className="overlay" onClick={hideModal}></div>
            
            <div className="subjlvl-popup-block">
                <h2>Add subject/levels</h2>
                <form className="add-edit-form" onSubmit={(e)=>onSubmit(e, { subject, levels })}>
                    <div className="form-control">
                        <DropdownMenu label = {"Subject: "} placeholder = {"Select Subject"} list = {subjectList} onChange={(e) => setSubject(Number(e.target.value))} oriSelected = {subject} />
                    </div>
                    <div className="form-control">
                        <CheckboxMultiple label = {"Levels: "} name = {"levels"} list = {levelList} setState={(data) => setLevels(data)} oriChecked={''} /> 
                    </div>
                    <input type='submit' value={'Save'} className="btn-small"/>
                </form>
            </div>
        </>
    )
}

export default AddSubjectAndLevels