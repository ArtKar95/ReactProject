import React from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import Nav from "./Components/Nav/Nav";
import ToDo from "./Components/ToDo/ToDo";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="app">
      <Header />
      <Nav />
      <div className="appContainer">
        <ToDo />
      </div>
=======

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>

    </div>
  );
}

export default App;
