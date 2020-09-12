import React from "react";
import classes from "./Nav.module.css";

const Nav = () => {
  return (
    <div className={classes.nav}>
      <p>My Tasks</p>
      <p>Deleted-Tasks</p>
      <p>Settings</p>
    </div>
  );
};
export default Nav;
