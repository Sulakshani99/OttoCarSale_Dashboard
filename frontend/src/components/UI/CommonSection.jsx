import React from "react";
import { Container } from "reactstrap";
import "../../styles/common-section.css";

const CommonSection = ({ title }) => {
  return (
    <section className="common__section mb-15">
      <Container className="text-center justify-center items-center ">
        <h1 className="text-light ">{title}</h1>
      </Container>
    </section>
  );
};

export default CommonSection;
