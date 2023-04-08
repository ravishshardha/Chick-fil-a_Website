import './App.css';
import Menu from './components/Menu';
import Customer from './components/Customer';
import Manager from './components/Manager';
import Server from './components/Server';
import Navbar from './components/Navbar';
import HomePage from './components/Homepage';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';

function App() {
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
