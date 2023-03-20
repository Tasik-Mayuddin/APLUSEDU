import { useState, useEffect } from "react"
import ButtonBig from "../Buttons/ButtonBig"
import AddOrEditChild from "./AddOrEditChild"
import { fetchAPI, fetchPostAPI } from "../../functions"
import ChildDetails from "./ChildDetails"

const ChildrenBase = () => {

  // Detect if + button pressed
  const [toggleView, setToggleView] = useState(false)


  // sets the state for the list of children, makes an api call upon render
  const [childrenList, setChildrenList] = useState([])
  useEffect(() => {
    const getChildrenList = async () => {
      const fetchChildrenList = await fetchAPI('children')
      setChildrenList(fetchChildrenList)
    }
    getChildrenList()
  }, [])

  //when user submits the form in AddOrEditChild
  const onSubmit = async (e, toPost) => {
    e.preventDefault()

    const data = await fetchPostAPI("children", toPost)
    setChildrenList([...childrenList, data])
    setToggleView(false)
  }
  

  return (
    <div>
      <h1>My Children</h1>

      {toggleView&&<AddOrEditChild onSubmit={onSubmit} hideModal={()=>setToggleView(false)} />}

      <div className="children-list">
        {childrenList.map((child, id)=>(
          <ChildDetails child={child} key={id} />
        ))}

      <ButtonBig text={"+"} color={'green'} onClick={()=>setToggleView(true)} />
      </div>

      

    </div>
  )
}

export default ChildrenBase