import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignupPage from "./pages/Signup"
import Login from "./pages/login"
import HomePage from "./pages/Home"


function App() {


  return (
    <>
     <div className="min-h-screen">
       <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<HomePage/>} />
      </Routes>
      </BrowserRouter>
     </div>
    </>
  )
}

export default App
