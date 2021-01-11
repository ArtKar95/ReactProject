import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { Switch, Route } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { connect } from "react-redux";
import Header from "./Components/Header/Header";
import Nav from "./Components/Nav/Nav";
import ToDo from "./Components/ToDo/ToDo";
import NotFoundPage from "./Components/NotFound/NotFound";
import TaskPage from "./Components/TaskPage/TaskPage";
import Loader from "./Components/Loader/Loader";
// import Login from './Components/Auth/Login';
// import Register from "./Components/Auth/Register/Register";

class App extends React.PureComponent {
  componentDidUpdate() {
    const { successMessage, error } = this.props;
    if (successMessage) {
      toast.success(successMessage);
    }
    if (error) {
      toast.error(error);
    }
  }

  render() {
    return (
      <div className="app">
        <Header />
        <Nav />
        <div className="appContainer">
          <Switch>
            <Route path="/" exact component={ToDo} />
            <Route path="/task/:id" exact component={TaskPage} />
            {/* <Route path="/register" exact component={Register} /> */}
            {/* <Route path="/login" exact component={Login} /> */}
            <Route path="*" exact component={NotFoundPage} />
            {/* <Route path="/not-found" exact component={NotFoundPage} />
          <Redirect to="/not-found" /> */}
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

        {this.props.loading && <Loader/>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.error,
    successMessage: state.successMessage,
    loading: state.loading,
  };
};

export default connect(mapStateToProps, null)(App);
