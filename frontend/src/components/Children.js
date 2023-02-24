import { useState, useEffect } from "react"
import axios from 'axios'

const Children = () => {

  const [childrenList, setChildrenList] = useState([])
  //Token: 241a8f9796e58be8bc051fd80d88b573d9dff98d

  useEffect(() => {
    const getChildrenList = async () => {
      // const res = await fetch('http://127.0.0.1:8000/api/children-list/', {
      //   method: 'GET',
      //   headers: {
      //     'Authorization': `Token 241a8f9796e58be8bc051fd80d88b573d9dff98d`,
      //   }
      // })
      // const res = await axios.get('http://127.0.0.1:8000/api/children-list/',
      //   {'withCredentials': true });
      const res = await axios.get('http://127.0.0.1:8000/api/children-list/')
      const data = await res.data
      setChildrenList(data)
    }
    getChildrenList()
  }, [])

  return (
    <>

    </>
  )
}

export default Children