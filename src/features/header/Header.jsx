import React from "react";
import './styles-header.css';
import stackLineLogo from "./stackline_logo.svg"

const Header = () => {
    return(
        <div className="header">
            <img src={stackLineLogo} className="logo" alt="StackLine"></img>
        </div>
    )
}

export default Header;