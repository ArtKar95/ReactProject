import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { Switch, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { connect } from "react-redux";
import Header from "./Components/Header/Header";
import Nav from "./Components/Nav/Nav";
import ToDo from "./Components/ToDo/ToDo";
import NotFoundPage from "./Components/NotFound/NotFound";
import TaskPage from "./Components/TaskPage/TaskPage";
import Loader from "./Components/Loader/Loader";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import AboutPage from "./Components/About/AboutPage";
import CustomRoute from "./Components/CustomRoute";
import Footer from "./Components/Footer/Footer";
import Contact from "./Components/Contact/Contact";
import Settings from "./Components/Settings/Settings";

class App extends React.PureComponent {
  componentDidUpdate() {
    const { successMessage, error, authSuccessMessage, authError } = this.props;
    if (successMessage) {
      toast.success(successMessage);
    }
    if (error) {
      toast.error(error);
    }
    if (authSuccessMessage) {
      toast.success(authSuccessMessage);
    }
    if (authError) {
      toast.error(authError);
    }
  }

  render() {
    const { loading, authLoading } = this.props;
    return (
      <div className="app">
        <Header />
        <Nav />
        <Footer />
        <div className="appContainer">
          <Switch>
            <Route path="/about" exact component={AboutPage} />
            <Route path="/contact" exact component={Contact} />
            <CustomRoute type="private" path="/" exact component={ToDo} />
            <CustomRoute
              type="private"
              path="/task/:id"
              exact
              component={TaskPage}
            />
            <CustomRoute
              type="private"
              path="/settings"
              exact
              component={Settings}
            />

            <CustomRoute path="/register" exact component={Register} />
            <CustomRoute path="/login" exact component={Login} />
            <Route path="*" exact component={NotFoundPage} />
          </Switch>
        </div>

        <ToastContainer
          position="bottom-left"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        {(loading || authLoading) && <Loader />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.toDoReduser.error,
    successMessage: state.toDoReduser.successMessage,
    loading: state.toDoReduser.loading,
    authError: state.authReduser.error,
    authSuccessMessage: state.authReduser.successMessage,
    authLoading: state.authReduser.loading,
  };
};

export default connect(mapStateToProps, null)(App);
