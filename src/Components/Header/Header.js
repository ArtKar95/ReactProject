import React, { useEffect } from "react";
import classes from "./Header.module.css";
import logoToDo from "../../assets/images/logoToDo.jpg";
import { connect } from "react-redux";
import { getUserInfo } from "../../redux/authActionCreator";
import { firstLatter } from "../../Helpers/utils";

const Header = ({ isAuthenticated, getUserInfo, userInfo }) => {
  useEffect(() => {
    if (isAuthenticated) {
      getUserInfo();
    }
  }, [getUserInfo, isAuthenticated]);

  return (
    <div className={classes.header}>
      <img className={classes.logo} src={logoToDo} alt="Logo" />
      <h1 className={classes.toDo}>&#9734;&#9734;&#9734; My To-Do-List </h1>
      <div>
        {!!isAuthenticated && (
          <div>
            {userInfo ? (
              <>
                <span className={classes.nameIcon}>
                  {`${firstLatter(userInfo.name)}${firstLatter(
                    userInfo.surname
                  )}`}
                </span>
                <span>{`${userInfo.name} ${userInfo.surname}`}</span>
              </>
            ) : (
              " "
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReduser.isAuthenticated,
    userInfo: state.authReduser.userInfo,
  };
};

const mapDispatchToProps = {
  getUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
