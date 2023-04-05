import './App.css';
import Menu from './components/Menu';
import Customer from './components/Customer';
import Manager from './components/Manager';
import Server from './components/Server';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <div> <Navbar/> </div>
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
      </div>
    </div>
    
  );
}

export default App;
