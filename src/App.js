import React from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Nav from "./Components/Nav/Nav";
import ToDo from "./Components/ToDo/ToDo";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router";
import NotFoundPage from "./Components/NotFound/NotFound";
import TaskPage from "./Components/TaskPage/TaskPage";

function App() {
  return (
    <div className="app">
      <Header />
      <Nav />
      <div className="appContainer">
        <Switch>
          <Route path="/" exact component={ToDo} />
          <Route path="/task/:id" exact component={TaskPage} />
          <Route path="*" exact component={NotFoundPage} />
          {/* <Route path="/not-found" exact component={NotFoundPage} />
          <Redirect to="/not-found" /> */}
        </Switch>
      </div>
    </div>
  );
}

export default App;
