import { Routes, Route } from "react-router-dom"
import Navbar from './Component/Navbar'
import Ragister from './Pages/Ragister'
import Login from './Pages/Login'
import Home from "./Pages/Home"
import Logout from './Pages/Logout'
import Attendance from './Pages/Attendance'

function App() {

  return (
    <>
      <Navbar />
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ragister' element={<Ragister />} />
        <Route path='/login' element={<Login />} />
        <Route path='/attendance' element={<Attendance />} />
        <Route path='/logout' element={<Logout />} />
      </Routes>

    </>
  )
}

export default App
