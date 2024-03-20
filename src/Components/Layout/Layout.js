import { Outlet } from "react-router-dom"
// import { CssBaseline } from "@mui/material"
import Navbar from "../Navbar/Navbar"
import Footer from '../Footer/Footer'
import AuthComponent from "../AuthComponent/AuthComponent";

function Layout() {
  return (
    <>
        {/* <CssBaseline /> */}
        
        <Navbar />
        <Outlet />
        <Footer />
    </>
  )
}

export default Layout
