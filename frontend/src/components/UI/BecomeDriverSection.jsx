import React from "react";
import "../../styles/become-driver.css";
import { Container } from "reactstrap";
import saleImg from "../../assets/images/sale.png";

const BecomeDriverSection = () => {
  return (
    <section className="become__driver">
      <Container>
        <div className="become__driver-grid">
          <div className="become__driver-img">
            <img src={saleImg} alt="Sale" className="img-fluid" />
          </div>
          <div className="become__driver-content">
            <div className="content-inner">
              <h2 className="section__title">Do you want to sell your car?</h2>
              <p className="text-white">
                Let us help you to sell your car. We have a large customer base
                that is looking for vehicles like yours. We will help you to
                connect with them.
              </p>
              <div className="button-group">
                <a href="/addvehicle" className="btn btn-primary">
                  Create an Ad
                </a>
                <a href="/orders" className="btn btn-secondary">
                  Your Orders
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BecomeDriverSection;
