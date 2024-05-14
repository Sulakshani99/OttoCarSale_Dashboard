import React from "react";

const Helmet = (props) => {
  document.title = "Otto Cars - " + props.title;
  return <div className="w-100 overflow-y-hidden">{props.children}</div>;
};

export default Helmet;
