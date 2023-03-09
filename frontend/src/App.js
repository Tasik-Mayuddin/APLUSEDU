import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
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

function App() {

  const [role, setRole] = useState('')

  useEffect(()=>{
    const get_role = async() => {
      const fetchRole = await fetchAPI('role')
      setRole(fetchRole.role)
    }
    get_role()
  }, [])
  

  const parentSideMenu = [['My Children', '/children'], ['Chat with Tutors', '/chat']]
  const tutorSideMenu = [['My Profile', '/profile'], ['Subjects and Levels', '/subjectsandlevels'], ['Chat with Parents', '/chat']]

  return (
    <>
      
      <Router>
      <SideMenu nameHrefTupleList={role==='Parent'?parentSideMenu:tutorSideMenu}/>
        <div className="container">

          {role==='Parent'?
            <Routes>

              {/*parent interface routing */}
              <Route path='/dashboard' element={<ParentDash />}/>
              <Route path='/children' element={<ChildrenBase />}/>
              <Route path='/children/:slug' element={<Child />} />
              <Route path='/children/:slug/tutors' element={<TutorQuery />} />

            </Routes>:
            <Routes>
              {/*tutor interface routing */}
              <Route path='/profile' element={<Profile />} />
              <Route path='/subjectsandlevels' element={<SubjectsAndLevels />} />
            </Routes>
          }
          
          
        </div>
      </Router>
    </>
  );
}

export default App;
