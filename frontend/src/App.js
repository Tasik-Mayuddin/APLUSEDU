import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import ParentDash from './components/ParentDash'
import ChildrenBase from './components/ChildrenBase'

function App() {


  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path='/dashboard' element={<ParentDash />}/>
          <Route path='/children' element={<ChildrenBase />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
