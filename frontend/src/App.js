import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import ParentDash from './components/ParentDash'
import ChildrenBase from './components/ChildrenBase'

function App() {

// fetch API
const fetchAPI = async (endpoint) => {
  const res = await fetch('http://127.0.0.1:8000/api/'+endpoint)
  const data = await res.json()
  return(data)
}


  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path='/dashboard' element={<ParentDash />}/>
          <Route path='/children' element={<ChildrenBase fetchAPI={fetchAPI} />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
