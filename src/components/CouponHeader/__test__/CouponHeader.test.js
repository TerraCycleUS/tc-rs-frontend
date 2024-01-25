import React from "react";
import { render, screen } from "@testing-library/react";
import CouponHeader from "../index";
import TestEnvironment from "../../ForTestWriting/TestEnvironment";
import "@testing-library/jest-dom";
import store from "../../../store";

describe("CouponHeader", () => {
  test("it renders CouponHeader component", async () => {
    render(
      <TestEnvironment store={store}>
        <CouponHeader />
      </TestEnvironment>
    );
  });

  test("it will render given images inside", () => {
    const mockBackgroundImage =
      "https://tc-rs-stage.herokuapp.com/api/waste/photo/b8fa6525-7094-439f-9ffb-b0acdda959be.png";
    const mockBrandLogo =
      "http://localhost:4000/api/file/af4ab39d-cf0c-49c3-99a6-2dbf9e8bf6c6.jpg";

    render(
      <TestEnvironment store={store}>
        <CouponHeader
          backgroundImage={mockBackgroundImage}
          brandLogo={mockBrandLogo}
        />
      </TestEnvironment>
    );

    const brandLogo = screen.getByAltText("brand");
    const retailerLogo = screen.getByAltText("retailer");
    expect(brandLogo).toHaveAttribute("src", mockBackgroundImage);
    expect(retailerLogo).toHaveAttribute("src", mockBrandLogo);
  });
});
