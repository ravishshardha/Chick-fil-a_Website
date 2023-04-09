import React from "react";
import banner from "../../resources/banner.png";

function Header() {
  return (
    <div className="header-container">
      <img src={banner} alt="banner" className="header-image" />
      <div className="header-heading">
        <h3>
          To glorify God by being a faithful steward of all that is entrusted to
          us.
        </h3>
        <h1>
          EAT <span className="heading-span">MOR</span>
          <br />
          CHIKIN
        </h1>
        <p className="details">
          It’ll be our pleasure to
          <br /> serve you again soon
        </p>
      </div>
    </div>
  );
}

export default Header;
