//import logo from './logo.svg';
//import './App.css';
import React from 'react'
import Table from './MenuTable'



function Menuheader({title}){
    return (
        <h1>
          {title}
        </h1>
    );
}

function Menutable({children}){
  return (
    <div>
      {children}
    </div>
  );
}

function Menu() {
  return (
    <div className="Menu">
      <header className="Menu-header">
        <Menuheader title={"Chick-fil-a menu"}/>
        <p>Here you can find all items on the chick-fil-a menu</p>
        <Menutable>
          <Table/>
        </Menutable>
      </header>
    </div>
  );
}

export default Menu;
