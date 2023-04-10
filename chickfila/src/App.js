import './App.css';
import Menu from './components/Menu';
import Customer from './components/Customer';
import Manager from './components/Manager';
import Server from './components/Server';
import Navbar from './components/Navbar';
import HomePage from './components/Homepage';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';

// retrieve API Packages
//import React, { useState, useEffect } from 'react';

function App() {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetch('/api/data')
  //     .then(response => response.json())
  //     .then(data => setData(data))
  //     .catch(error => console.error(error));
  // }, []);

  return (
    <div className="App">
      <Router>
    <Navbar />
    <Routes>
        <Route exact path='/' exact element={<HomePage />} />
        <Route path='/customer' element={<Customer/>} />
        <Route path='/manager' element={<Manager/>} />
        <Route path='/menu' element={<Menu/>} />
        <Route path='/server' element={<Server/>} />
    </Routes>
    </Router>
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
