import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";
import Login from "./auth/Login";

export default function HomePage() {
  return (
    <div className="Homepage">
      Here we will have links to the other pages
      <NavMenu>
        <NavLink to="/manager" activeStyle>
          Manager
        </NavLink>
        <NavLink to="/server" activeStyle>
          Server
        </NavLink>
        <NavLink to="/customer" activeStyle>
          Customer
        </NavLink>
        <NavLink to="/menu" activeStyle>
          Menu
        </NavLink>
        <Login />
      </NavMenu>
    </div>
  );
}
