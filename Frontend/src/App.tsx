import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignupPage from "./pages/Signup"
import Login from "./pages/login"
import HomePage from "./pages/Home"
import Profile from "./pages/Profile"
import Mainlayout from "./components/Mainlayout"


function App() {


  return (
    <>
      <div className="min-h-screen">
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<Login />} />
            <Route element={<Mainlayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
