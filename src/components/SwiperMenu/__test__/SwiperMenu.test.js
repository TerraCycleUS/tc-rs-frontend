import React from "react";
import { render, screen } from "@testing-library/react";
import SwiperMenu from "../index";
import store from "../../../store";
import TestEnvironment from "../../ForTestWriting/TestEnvironment";

jest.mock("../../../utils/http");
jest.mock("../../../utils/useApiCall", () => () => jest.fn(() => {}));

const retailers = [
  {
    id: 2,
    name: "Carrefour",
    description: "Lorem ipsum dolor sit amet, liquip ex ea commodo consequat",
    backgroundImage: "aca3a43cd02f.jpg",
    logo: "6e577fe1f42f.jpg",
    smallLogo: "c2b5ff810076.png",
    userLoyaltyCode: null,
    userLoyaltyPassCode: "null",
  },
];

describe("Tutorial ", () => {
  test("it renders Tutorial page", async () => {
    render(
      <TestEnvironment store={store}>
        <SwiperMenu
          retailers={retailers}
          setActiveRetailer={() => {}}
          activeRetailer={0}
          className="mock"
          useIndex={false}
        />
      </TestEnvironment>
    );

    screen.debug();
  });
});
