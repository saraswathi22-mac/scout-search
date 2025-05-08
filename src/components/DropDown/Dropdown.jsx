import React from "react";
import "./DropDown.css";

const items = ["Maps", "Books", "Flights", "Finance"];

const Dropdown = ({ show }) => {
  return (
    <div className={`dropdown ${show ? "block" : "hidden"}`}>
      {items.map((item) => (
        <div className="dropdown-content" key={item}>
          <button>{item}</button>
        </div>
      ))}
    </div>
  );
};

export default Dropdown;
