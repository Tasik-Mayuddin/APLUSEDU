import SubjectsAndLevelsDetails from "./SubjectsAndLevelsDetails"
import { useState, useEffect } from "react"
import { fetchAPI } from "../../functions"


const SubjectsAndLevels = () => {
    const [subjectsAndLevels, setSubjectsAndLevels] = useState([])
    useEffect(()=>{
        const getSubjectsAndLevels = async () => {
            const fetchSubjectsAndLevels = await fetchAPI('tutor_subjectsandlevels')
            setSubjectsAndLevels(fetchSubjectsAndLevels)
        }
        getSubjectsAndLevels()
    },[])
    


  return (
    <>
        <div className="subjectsandlevels-header">
            <h1>Subjects and Levels</h1>
        </div>
        <div>
            <SubjectsAndLevelsDetails />

        </div>
    </>
  )
}

export default SubjectsAndLevels