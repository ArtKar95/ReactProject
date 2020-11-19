import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Nav.module.css";

const Nav = () => {
  return (
    <div className={classes.nav}>
      <ul>
        <li>
          <NavLink to="/" exact activeClassName={classes.activeLink}>
            My Tasks
          </NavLink>
        </li>
        <li>
          <NavLink to="/egw" exact activeClassName={classes.activeLink}>
            Deleted-Tasks
          </NavLink>
        </li>
        <li>
          <NavLink to="/we" exact activeClassName={classes.activeLink}>
            Account
          </NavLink>
        </li>
        <li>
          <NavLink to="/w" exact activeClassName={classes.activeLink}>
            Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
export default Nav;
