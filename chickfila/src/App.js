import "./App.css";
import Menu from "./components/Menu";
import Customer from "./components/Customer";
import Manager from "./components/Manager";
import Server from "./components/Server";
import Navbar from "./components/Navbar";
import HomePage from "./components/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId =
  "556037042748-tdol6mrh13hn7709j3k8v2f4tptf7gha.apps.googleusercontent.com";
  
function App() {
  return (
    <div className="App">
      <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/manager" element={<Manager />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/server" element={<Server />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
      </GoogleOAuthProvider>
      {/* <div> <Navbar/> </div>
      <div className= "Menupage">
        <div>
          <Menu />
        </div>
      </div>
      <div className='Customerpage'>
        <div>
          <Customer/>
        </div>
      </div>
      <div className='Managerpage'>
          <Manager/>
      </div>
      <div className='Serverpage'>
          <Server/>
      </div> */}
    </div>
  );
}

export default App;
