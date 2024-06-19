import React from "react";
import { shallow } from "enzyme";
import SellingPage from "../SellingPage";

describe("SellingPage component", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<SellingPage />);
    expect(wrapper.exists()).toBeTruthy();
  });

  it("displays main categories section", () => {
    const wrapper = shallow(<SellingPage />);
    expect(wrapper.find(".main-section").exists()).toBeTruthy();
  });

  it("displays correct category links", () => {
    const wrapper = shallow(<SellingPage />);
    const categoryLinks = wrapper.find(".cate");
    expect(categoryLinks.length).toBe(5); // Assuming there are 5 categories
    expect(categoryLinks.at(0).find("h4").text()).toBe("Cars");
    expect(categoryLinks.at(1).find("h4").text()).toBe("Vans");
    expect(categoryLinks.at(2).find("h4").text()).toBe("Cabs");
    expect(categoryLinks.at(3).find("h4").text()).toBe("Trucks");
    expect(categoryLinks.at(4).find("h4").text()).toBe("Bikes");
  });
});
