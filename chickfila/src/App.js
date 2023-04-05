import './App.css';
import Menu from './Menu';
import Customer from './Customer';
import Manager from './Manager';
import Server from './Server';

function App() {
  return (
    <div className="App">
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
