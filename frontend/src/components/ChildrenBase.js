import { useState, useEffect } from "react"
import ButtonBig from "./ButtonBig"
import AddOrEditChild from "./AddOrEditChild"
import { fetchAPI, fetchPostAPI } from "../functions"

const ChildrenBase = () => {

  // Detect if + button pressed
  const [toggleView, setToggleView] = useState(false)


  // sets the state for the list of children, makes an api call upon render
  const [childrenList, setChildrenList] = useState([])
  useEffect(() => {
    const getChildrenList = async () => {
      const fetchChildrenList = await fetchAPI('children-list/')
      setChildrenList(fetchChildrenList)
    }
    getChildrenList()
  }, [])

  // Submit form
  
  const onSubmit = async (e, toPost) => {
    e.preventDefault()

    const data = await fetchPostAPI("add-child/", toPost)
    console.log(data)
    setChildrenList([...childrenList, data])
  }
  

  return (
    <div>
      <h1>My Children</h1>

      {toggleView&&<AddOrEditChild onSubmit={onSubmit} />}

      {childrenList.map((child, id)=>(
        <ButtonBig key={id} text={child.name} />
      ))}

      <ButtonBig text={"+"} color={'green'} onClick={()=>setToggleView(true)} />

    </div>
  )
}

export default ChildrenBase