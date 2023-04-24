import React from 'react'
import chickfilalogo from '../resources/chickfilalogo.png'
import { HomeLink} 
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
                <HomeLink to="/" activeStyle>
                    <img
                        src={chickfilalogo}
                        alt='Chick fil a logo'
                    ></img>
                </HomeLink>

            </div> 
        </nav>
    );
}