import { useState, useEffect } from "react"
import ButtonBig from "./ButtonBig"
import AddOrEditChild from "./AddOrEditChild"

const ChildrenBase = ({ fetchAPI }) => {

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



  return (
    <>
      <h1>My Children</h1>

      {toggleView&&<AddOrEditChild />}

      {childrenList.map((child)=>(
        <ButtonBig text={child.name} />
      ))}
      <ButtonBig text={"+"} color={'green'} onClick={()=>setToggleView(true)} />
    </>
  )
}

export default ChildrenBase