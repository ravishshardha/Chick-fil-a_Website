import "./App.css";
import Menu from "./components/Menu";
import Customer from "./components/Customer";
import Manager from "./components/Manager";
import Server from "./components/Server";
import Navbar from "./components/Navbar";
import HomePage from "./components/Homepage";
import UserwayWidget from "./components/UserwayWidget";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {useEffect, useState} from "react";
import Weather from "./components/Weather";
import './css/Footer.css';
import googleStorePic from './resources/google-play.png';
import { ReactComponent as Logo } from './resources/app-store.svg';
import './css/Footer.css';

function Footer(){
  return (
    <footer className='appFooter'>
      <div>
      <h4 style={{paddingTop: '1%'}}>Chick-fil-a Access</h4>
        <ul className="footer-elements">
          <li className="footer-indv-element"><a style={{color: 'white'}} href="https://www.chick-fil-a.com/nutrition-allergens" target="_blank">Nutrition & Allergens</a></li>
          <li className="footer-indv-element"><a style={{color: 'white'}} href="https://www.chick-fil-a.com/customer-support" target="_blank">Customer Support</a></li>
          <li className="footer-indv-element"><a style={{color: 'white'}} href="https://www.chick-fil-a.com/franchising" target="_blank">Franchising</a></li>
          <li className="footer-indv-element"><a style={{color: 'white'}} href="https://shop.chick-fil-a.com/?_gl=1*zytmxo*_ga*MTgzOTU3NDQwOC4xNjgwOTczNjMy*_ga_W1ZL54JC7M*MTY4MjQ2Mjg3Mi4xNC4xLjE2ODI0NjMwNTguNDkuMC4w" target="_blank">Merchandise</a></li>
          <li style={{marginLeft: '32%', marginTop: '2%'}}><a href='https://play.google.com/store/apps/details?id=com.chickfila.cfaflagship&pli=1' target="_blank"><img style={{width: '85%'}} src={googleStorePic} alt="play Store" /></a></li>
          <li style={{marginTop: '2%'}}><a href='https://apps.apple.com/us/app/chick-fil-a/id488818252' target="_blank"><Logo/></a></li>
        </ul>
        <ul className="footer-elements">
          <li className="footer-policies"><a style={{color: 'lightgrey'}} href="https://www.chick-fil-a.com/legal#privacy_policy" target="_blank">Privacy Policy</a></li>
          <li className="footer-policies" style={{marginLeft: '6%'}}><a style={{color: 'lightgrey'}} href="https://www.chick-fil-a.com/legal#chick-fil-a_cookie_and_interest-based_advertising_policy" target="_blank">Cookie</a></li>
          <li className="footer-policies" style={{marginLeft: '5.23%'}}><a style={{color: 'lightgrey'}} href="https://www.chick-fil-a.com/locations/browse" target="_blank">Listing</a></li>
          <li className="footer-policies" style={{marginLeft: '4.2%'}}><a style={{color: 'lightgrey'}} href="https://www.chick-fil-a.com/legal" target="_blank">Legal</a></li>
        </ul>
      </div>

      <Weather />
      <GoogleElement _check={true}/>

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
        <Navbar/>
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
      <UserwayWidget/>
      
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
