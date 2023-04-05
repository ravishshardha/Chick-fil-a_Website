//import logo from './logo.svg';
//import './App.css';
import React from 'react'
import Table from './MenuTable'
import '../css/Menu.css';


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
    <div className="MenuMain">
      <header className="Menu-header">
        <Menuheader title={"Chick-fil-a menu"}/>
      </header>
      <div className='MenuMainContent'>
        <h3>Here you can find all items on the chick-fil-a menu</h3>
        <Menutable>
          {/* This is filler table until we get it hooked up to the backend */}
          <Table/>
          <Table/>
          <Table/>
          <Table/>
          <Table/>
          <Table/>
        </Menutable>
      </div>
    </div>
  );
}

export default Menu;
