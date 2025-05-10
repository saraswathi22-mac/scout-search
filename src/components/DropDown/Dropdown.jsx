import React from "react";
import "./DropDown.css";

const Dropdown = ({ show, items }) => {
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
