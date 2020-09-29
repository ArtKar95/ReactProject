import React from "react";
import classes from "./Header.module.css";
import logoToDo from "../../assets/images/logoToDo.jpg";

const Header = () => {
  return (
    <div className={classes.header}>
      <img className={classes.logo} src={logoToDo} alt="Logo" style={{width: "113px"}} />
      <h1 className={classes.toDo}>&#9734;&#9734;&#9734; My TO-Do-List </h1>
     <h2 className={classes.logOut}>Log-Out</h2>
    </div>
  );
};
export default Header;
