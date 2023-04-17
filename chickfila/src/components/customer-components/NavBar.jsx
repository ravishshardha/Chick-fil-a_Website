import React from "react";
import { Link } from "react-scroll";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";


function NavBar( {onClick} ) {
  const menuItems = [
    {
      name: "Entree",
      link: "entree",
    },
    {
      name: "Sides",
      link: "sides",
    },
    {
      name: "Extras",
      link: "extras",
    },
    {
      name: "Drinks",
      link: "drinks",
    },
    {
      name: "Seasonal",
      link: "seasonal",
    },
  ];

  return (
    <Container>
      <nav className="customer-nav-bar">
        <div className="customer-nav-bar-menu-items">
          {menuItems.map((it) => (
            <span key={it.name} className="customer-nav-bar-menu-item">
              {onClick ? (
                <Button onClick={()=>onClick(it.link)} variant="danger">{it.name}</Button>
              ) : (
                <Link to={it.link} smooth={true} duration={1000}>
                  {it.name}
                </Link>
              )}
            </span>
          ))}
        </div>
      </nav>
    </Container>
  );
}

export default NavBar;
