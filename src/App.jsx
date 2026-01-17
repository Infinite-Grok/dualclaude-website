import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Simulator from './pages/Simulator'
import Timeline from './pages/Timeline'
import Technical from './pages/Technical'
import About from './pages/About'
import Navigation from './components/Navigation'

function App() {
  return (
    <Router basename="/dualclaude">
      <div className="min-h-screen bg-gray-950">
        <Navigation />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/simulator" element={<Simulator />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/technical" element={<Technical />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
