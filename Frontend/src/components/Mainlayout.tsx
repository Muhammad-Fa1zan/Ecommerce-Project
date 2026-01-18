import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Mainlayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet/>
      </main>
    </>
  )
}

export default Mainlayout;
