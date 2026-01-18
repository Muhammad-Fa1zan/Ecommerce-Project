import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignupPage from "./pages/Signup"
import Login from "./pages/login"
import HomePage from "./pages/Home"
import Mainlayout from "./components/Mainlayout"
import ProtectRoute from "./components/ProtectLayout/ProtectRoute"
import Profile from "./pages/Profile"
import AdminLayout from "./components/ProtectLayout/AdminLayout"
import Products from "./pages/Products"
import CartPage from "./pages/CartPage"


function App() {


  return (
    <>
      <div className="min-h-screen">
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<Login />} />
            <Route element={<Mainlayout />}>
              <Route element={<ProtectRoute />}  >
                <Route path="/" element={<HomePage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/products" element={<Products/>} />
                <Route path="/cart" element={<CartPage />} />
              </Route>
              <Route element={<AdminLayout />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
