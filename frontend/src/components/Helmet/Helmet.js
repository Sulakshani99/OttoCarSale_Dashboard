import React from "react";

const Helmet = (props) => {
  document.title = "Otto Cars - " + props.title;
  return <div className="w-auto overflow-y-hidden"> {props.children} </div>;
};

export default Helmet;
