import React from "react";
import classes from "./Header.module.css";
import logoToDo from "../../assets/images/logoToDo.jpg";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const Header = (props) => {
  return (
    <div className={classes.header}>
      <img
        className={classes.logo}
        src={logoToDo}
        alt="Logo"
        style={{ width: "113px" }}
      />
      <h1 className={classes.toDo}>&#9734;&#9734;&#9734; My To-Do-List </h1>
      {!props.isAuthenticated && (
        <>
          <NavLink to="/" exact activeClassName={classes.activeLink}>
            Home
          </NavLink>
          <NavLink to="/register" exact activeClassName={classes.activeLink}>
            Register
          </NavLink>
          <NavLink to="/login" exact activeClassName={classes.activeLink}>
            Login
          </NavLink>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReduser.isAuthenticated,
  };
};

export default connect(mapStateToProps, null)(Header);
