import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import ParentDash from './components/Parent/ParentDash'
import ChildrenBase from './components/Parent/ChildrenBase'
import Child from './components/Parent/Child'
import TutorQuery from './components/Parent/TutorQuery'

function App() {


  return (
    <Router>
      <div className="container">
        <Routes>

           {/*parent interface routing */}
          <Route path='/dashboard' element={<ParentDash />}/>
          <Route path='/children' element={<ChildrenBase />}/>
          <Route path='/children/:slug' element={<Child />} />
          <Route path='/children/:slug/tutors' element={<TutorQuery />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
