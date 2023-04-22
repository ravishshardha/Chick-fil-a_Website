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

import {useEffect, useState} from "react";
import Weather from "./components/Weather";

function Footer(){
  return (
    <footer className='appFooter'>
      <div>[TODO: Insert anything related to chickfila here that would be on a footer]</div>
      <GoogleElement _check={true}/>
      <Weather />
    </footer>
  );
}

function GoogleElement({_check}){
  const [check, setCheck] = useState(false);

  useEffect(() => {
    setCheck(_check);
  }, []);

   //adding google translate
   const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false
      },
      "google_translate_element"
    );
    console.log("new g init");
  };

  
  useEffect(() => {
    if (check){

      var addScript = document.createElement("script");
      addScript.setAttribute(
        "src",
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      );
      document.body.appendChild(addScript);
      console.log("new useeffect");
      window.googleTranslateElementInit = googleTranslateElementInit;
    }
  }, [check]);

  return (
    <div>
      <div id="google_translate_element"></div>
    </div>
  );
}


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
      <Footer/>
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
