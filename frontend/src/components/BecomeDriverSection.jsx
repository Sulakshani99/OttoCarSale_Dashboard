import React from "react";
import "../styles/become-driver.css";
import { Container, Row, Col } from "reactstrap";

import saleImg from "../assets/images/sale.png";
// import { NavLink } from "react-router-dom";

const BecomeDriverSection = () => {
  return (
    <section className="become__driver">
      <Container>
        <Row>
          <Col lg="6" md="6" sm="12" className="become__driver-img">
            <img src={saleImg} alt="" style={{width:'500px'}}/>
          </Col>

          <Col lg="6" md="6" sm="12" style={{marginTop:'-240px', marginLeft:'550px'}}>
            <h2 className="section__title become__driver-title" style={{marginBottom:'30px'}}>
              Do you want to sale your car?
            </h2>
            <bbr />
            <h4 className="text-white text-justify" style={{color:'white', marginBottom:'30px'}}>
              Lets us help you to sell your car. We have a large customer base
              that is looking for vehicles like yours. We will help you to
              connect with them.
            </h4>
            <a href="/addvehicle" style={{padding:'30px',margin:'30px'}}>
              <button className="btn mt-4" style={{height:'30px',padding:'5px',borderRadius:'5px', width:'200px'}}>
                Create an Ad
              </button>
            </a>
            <a href="/orders">
              <button className="btn mt-4" style={{height:'30px',padding:'5px',borderRadius:'5px', width:'200px'}}>
                Your Orders
              </button>
            </a>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BecomeDriverSection;
