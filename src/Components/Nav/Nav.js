import React from "react";
import classes from "./Nav.module.css";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { logout } from "../../redux/authActionCreator";

const Nav = ({ isAuthenticated, logout }) => {
  return (
    <div className={classes.nav}>
      <ul>
        <li>
          <NavLink to="/about" exact activeClassName={classes.activeLink}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" exact activeClassName={classes.activeLink}>
            Contact
          </NavLink>
        </li>

        {isAuthenticated ? (
          <>
            <li>
              <NavLink to="/" exact activeClassName={classes.activeLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings"
                exact
                activeClassName={classes.activeLink}
              >
                Settings
              </NavLink>
            </li>
            <li>
              <Button
                variant="secondary"
                className={`text-info p-1 ${classes.logout}`}
                onClick={logout}
              >
                Logout
              </Button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login" exact activeClassName={classes.activeLink}>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                exact
                activeClassName={classes.activeLink}
              >
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
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
