import React from "react";

const Profession = (props) => {
  let profession = props.profession;
  return (
    <div>
      <p>I am a {profession}</p>
    </div>
  );
};
export default Profession;
