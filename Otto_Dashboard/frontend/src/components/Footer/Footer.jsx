import React from "react";

import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/footer.css";
import logo from "../../assets/images/Logo/logo2.svg";

const quickLinks = [
  {
    path: "/about",
    display: "About",
  },

  {
    path: "#",
    display: "Privacy Policy",
  },

  {
    path: "/vehicles",
    display: "Car Listing",
  },
  {
    path: "/blogs",
    display: "Blog",
  },

  {
    path: "/contact",
    display: "Contact",
  },
];

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="4" md="4" sm="12">
            <div className="logo footer__logo">
              <h1>
              <Link to="/home" className=" d-flex align-items-center gap-2">
                    {/* <img src={logo} alt="logo" className=" h-16" /> */}
                  </Link>
              </h1>
            </div>
            <p className="footer__logo-content">
            Otto Car Sale is a leading online platform for buying and selling cars. We provide a wide range of vehicles and a seamless car buying experience. Browse our car listings, read our blog, and get in touch with us for any inquiries. Start your car shopping journey with Otto Car Sale today!
            </p>
          </Col>

          <Col lg="2" md="4" sm="6">
            <div className="mb-4 ml-4">
              <h5 className="footer__link-title">Quick Links</h5>
              <ListGroup>
                {quickLinks.map((item, index) => (
                  <ListGroupItem key={index} className="p-0 mt-3 quick__link">
                    <Link to={item.path}>{item.display}</Link>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </div>
          </Col>

          <Col lg="3" md="4" sm="6">
            <div className="mb-4 ml-4">
              <h5 className="footer__link-title mb-4">Head Office</h5>
              <p className="office__info">katugasthota, Kandy</p>
              <p className="office__info">Phone: +94 77 123 4567</p>

              <p className="office__info">Email: ottocar@gmail.com</p>

              <p className="office__info">Office Time: 10am - 7pm</p>
            </div>
          </Col>

          <Col lg="3" md="4" sm="12">
            <div className="mb-4">
              <h5 className="footer__link-title">Newsletter</h5>
              <p className="section__description">Subscribe our newsletter</p>
              <div className="newsletter">
                <input type="email" placeholder="Email" />
                <span>
                  <i class="ri-send-plane-line"></i>
                </span>
              </div>
            </div>
          </Col>

          <Col lg="12">
            <div className="footer__bottom">
              <p className="section__description d-flex align-items-center justify-content-center gap-1 pt-4">
                <i class="ri-copyright-line"></i>Copyright {year}, Developed by RSSS. All rights reserved.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
