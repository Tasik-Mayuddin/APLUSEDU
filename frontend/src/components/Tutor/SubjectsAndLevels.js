import SubjectsAndLevelsDetails from "./SubjectsAndLevelsDetails"
import { useState, useEffect } from "react"
import { fetchAPI, fetchDeleteAPI, fetchPostAPI } from "../../functions"
import ButtonBig from "../Buttons/ButtonBig"
import AddSubjectAndLevels from "./AddSubjectAndLevels"



const SubjectsAndLevels = () => {
    const [subjectsAndLevels, setSubjectsAndLevels] = useState([])
    const [showModal, setShowModal] = useState(false)


    useEffect(()=>{
        const getSubjectsAndLevels = async () => {
            const fetchSubjectsAndLevels = await fetchAPI('tutor_subjectsandlevels')
            setSubjectsAndLevels(fetchSubjectsAndLevels)
        }
        getSubjectsAndLevels()
    },[])
    
    const onSubmit = async(e, toPost) => {
        e.preventDefault()
        toPost['levels'] = toPost['levels'].sort()
        const data = await fetchPostAPI('tutor_subjectsandlevels', toPost)
        setSubjectsAndLevels(data)
        setShowModal(false)
    }

    const onDelete = async(toDel) => {
        const data = await fetchDeleteAPI('tutor_subjectsandlevels', toDel)
        setSubjectsAndLevels(data)
    }

    return (
        <>
            <div className="subjectsandlevels-header">
                <h1>Subjects and Levels</h1>
            </div>
            <div>
                {subjectsAndLevels.map((item, id) => (
                    <SubjectsAndLevelsDetails 
                        key={id} 
                        subjectAndLevels = {item}
                        onDelete={onDelete}
                    />
                ))}
                <ButtonBig text={"+"} color={'green'} onClick={()=>setShowModal(true)} />
            </div>
            {showModal&&<AddSubjectAndLevels onSubmit={onSubmit} hideModal={()=>setShowModal(false)} />}
        </>
    )
}

export default SubjectsAndLevels