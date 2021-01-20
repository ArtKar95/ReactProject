import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Nav.module.css";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { logout } from "../../redux/authActionCreator";

const Nav = ({ isAuthenticated, logout }) => {
  return (
    <div className={classes.nav}>
      {isAuthenticated && (
        <ul>
          <li>
            <NavLink to="/" exact activeClassName={classes.activeLink}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/tasks" exact activeClassName={classes.activeLink}>
              My Tasks
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
          <li>
            <Button
              variant="secondary"
              className="mt-2 text-info"
              onClick={logout}
            >
              Logout
            </Button>
          </li>
        </ul>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReduser.isAuthenticated,
  };
};

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
