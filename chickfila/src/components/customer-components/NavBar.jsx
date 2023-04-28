import React from "react";
import { Link } from "react-scroll";
import Container from "react-bootstrap/esm/Container";


function NavBar() {
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
    {
      name: "Meals",
      link: "combo",
    }
  ];

  return (
    <Container>
      <nav className="customer-nav-bar">
        <div className="customer-nav-bar-menu-items">
          {menuItems.map((it) => (
            <span key={it.name} className="customer-nav-bar-menu-item">
                <Link to={it.link} smooth={true} duration={1000}>
                  {it.name}
                </Link>
            </span>
          ))}
        </div>
      </nav>
    </Container>
  );
}

export default NavBar;
