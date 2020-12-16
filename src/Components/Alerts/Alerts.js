import React from "react";

export const TitleAlert = ({text}) => {
  return (
    <div className="alert alert-danger" role="alert">
      {text}
    </div>
  );
};
