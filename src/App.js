import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Contact from "./Components/Contact/Contact";
import Login from "./Components/Login/Login";
import './App.css';
import AuthComponent from './Components/AuthComponent/AuthComponent'
import Admin from "./Components/AdminPage/Admin";
import Claim from "./Components/Claim/Claim";
import '../node_modules/@syncfusion/ej2-base/styles/material.css';
import { registerLicense } from '@syncfusion/ej2-base';
import OrderType from "./Components/OrderType/OrderType";
import Unauthorized from "./Components/Unauthorized/Unauthorized";
import ProtectedRoute  from "./Components/ProtectedRoute";

function App() {
  return (
    // <div className="App">
      
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <h1>MSAL Azure AD Authentication with React</h1>
    //   <AuthComponent />
    //   </header>
    // </div>

<BrowserRouter>
<Routes>
    <Route path="/" element={<AuthComponent />} />
    <Route path="contact" element={<Contact />} />
    <Route path="login" element={<Contact />} />
    <Route path="admin" element={<Admin />} />
    <Route path="/claim" element={<ProtectedRoute> <Claim /> </ProtectedRoute>} />
    <Route path="/ordertype" element={<ProtectedRoute> <OrderType/> </ProtectedRoute>}/>
    <Route path="unauthorized" element={<Unauthorized />} />
   
</Routes>
</BrowserRouter>
  );
}

export default App;