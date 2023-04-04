import logo from './logo.svg';
import './App.css';
import Menu from './Menu';
import Customer from './Customer';
import Manager from './Manager';
import Server from './Server';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learning react now 
        </a>
      </header>
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
