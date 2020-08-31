import React from "react";
import AboutMe from "./AboutMeComponent";
import Name from "./NamesComponents";
import Profession from "./Profession";

const Person = () => {
  return (
    <>
      <Name name="Artur" surname="Karapetyan" />
      <AboutMe age="25" />
      <Profession profession="Economist" />
    </>
  );
};

export default Person;
