import React from "react";
import '../../css/Manager.css'

function RadioInputItem () {
    const [selectedOption, setSelectedOption] = React.useState("male");

    const handleOptionChange = event => {
      setSelectedOption(event.target.value);
    };
  
    return (
        <div class="radio">
        <input value="entree" name="product" id="entree" type="radio" label="Entree"></input>
        <input value="side" name="product" id="side" type="radio" label="Side"></input>
        <input value="drink" name="product" id="drink" type="radio" label="Drink"></input>
        <input value="sauce" name="product" id="sauce" type="radio" label="Sauce"></input>
        <input value="extra" name="product" id="extra" type="radio" label="Extras"></input>
        <input value="seasonal" name="product" id="seasonal" type="radio" label="Seasonal"></input>
        </div>
    );
}

export default RadioInputItem;