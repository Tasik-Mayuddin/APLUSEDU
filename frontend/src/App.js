import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import ParentDash from './components/Parent/ParentDash'
import ChildrenBase from './components/Parent/ChildrenBase'
import Child from './components/Parent/Child'
import TutorQuery from './components/Parent/TutorQuery'
import SideMenu from './components/Common/SideMenu'
import { fetchAPI } from './functions'
import { useState, useEffect } from 'react'
import Profile from './components/Tutor/Profile'
import SubjectsAndLevels from './components/Tutor/SubjectsAndLevels'
import AllocationAndRequests from './components/Tutor/AllocationAndRequests'
import Chat from './components/Common/Chat'
import ChatHOC from './components/Common/ChatHOC'

function App() {

  const [role, setRole] = useState('')
  const [id, setId] = useState('')
  const [username, setUsername] = useState('')

  useEffect(()=>{
    const get_role = async() => {
      const fetchRole = await fetchAPI('role')
      setRole(fetchRole.user_role)
      setId(fetchRole.user.id)
      setUsername(fetchRole.user.username)
    }
    get_role()
  }, [])
  

  const parentSideMenu = [['My Children', '/children'], ['Chat with Tutors', '/chat']]
  const tutorSideMenu = [['My Profile', '/profile'], ['Subjects and Levels', '/subjectsandlevels'], ['Allocations', '/allocations'], ['Chat with Parents', '/chat']]

  return (
    <>
      
      <Router>
      <SideMenu nameHrefTupleList={role==='Parent'?parentSideMenu:tutorSideMenu}/>
        <div className="container">

          {role&&(role==='Parent')?
            <Routes>

              {/*parent interface routing */}
              <Route path='/dashboard' element={<Navigate to="/children" />}/>
              <Route path='/children' element={<ChildrenBase />}/>
              <Route path='/children/:slug' element={<Child />} />
              <Route path='/children/:slug/tutors' element={<TutorQuery />} />
              <Route path='/chat' element={<ChatHOC role={role} username = {username} />} />

            </Routes>:
            <Routes>
              {/*tutor interface routing */}
              <Route path='/dashboard' element={<Navigate to="/profile" />}/>
              <Route path='/profile' element={<Profile />} />
              <Route path='/subjectsandlevels' element={<SubjectsAndLevels />} />
              <Route path='/allocations' element={<AllocationAndRequests userId={id} />} />
              <Route path='/chat' element={<ChatHOC role={role} username = {username} />} />
            </Routes>
          }
          
          
        </div>
      </Router>
    </>
  );
}

export default App;
