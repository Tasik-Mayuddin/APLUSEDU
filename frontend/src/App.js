import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import ParentDash from './components/ParentDash'
import ChildrenBase from './components/ChildrenBase'
import Child from './components/Child'

function App() {


  return (
    <Router>
      <div className="container">
        <Routes>

           {/*parent interface routing */}
          <Route path='/dashboard' element={<ParentDash />}/>
          <Route path='/children' element={<ChildrenBase />}/>
          <Route path='/children/:slug' element={<Child />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
