import React from 'react'
import chickfilalogo from '../resources/chickfilalogo.png'
import { Nav, NavLink, NavMenu } 
    from "./NavbarElements";
// import {
//     Nav,
//     NavLink,
//     Bars,
//     NavMenu,
//     NavBtn,
//     NavBtnLink,
//   } from './NavbarElements';

// navbar which contains a Home button and accessibility button. 
// will show up on every page, as navbars do

/* sources
  https://www.geeksforgeeks.org/create-a-responsive-navbar-using-reactjs/#
*/

export default function Navbar (){
    return(
        <nav>
            <div>
                <img 
                    src= {chickfilalogo}
                    alt='Chick fil a logo'
                    width={150}
                    height={60}
                ></img>
                <button>accessibility</button>
                <NavLink to="/" activeStyle>
                    Home
                </NavLink>
            </div> 
        </nav>
    );
}