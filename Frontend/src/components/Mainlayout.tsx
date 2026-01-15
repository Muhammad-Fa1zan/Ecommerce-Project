import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Mainlayout() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <Outlet/>
      </main>
    </>
  )
}

export default Mainlayout;
