import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Auth from './components/auth'
import About from './components/about'
import Contact from './components/contact'
import './App.css'

function App() {
  
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/contact">Contact</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
