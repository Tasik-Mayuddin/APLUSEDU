import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import ParentDash from './components/ParentDash'
import Children from './components/Children'

function App() {

// fetch API
const fetchAPI = async (endpoint) => {
  const res = await fetch(endpoint)
  const data = await res.json()
  return(data)
}

// obtain token

// const getToken = async () => {
//   fetch('http://127.0.0.1:8000/get_token').then(response => response.json()).then(data => {
//     const token = data.token
//     document.cookie = `token=${token}; path=/`
//   })}
// getToken()

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path='/dashboard' element={<ParentDash />}/>
          <Route path='/children' element={<Children fetchAPI={fetchAPI} />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
