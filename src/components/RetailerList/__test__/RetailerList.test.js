import React from "react";
import { render, screen } from "@testing-library/react";
import RetailerList from "../index";
import store from "../../../store";
import { setUser } from "../../../actions/user";
import TestEnvironment from "../../ForTestWriting/TestEnvironment";

jest.mock("../../../utils/http");
jest.mock("../../../utils/useApiCall", () => () => jest.fn(() => {}));

describe("RetailerList ", () => {
  const mockRetailers = [
    {
      id: 1,
      name: "Monoprix",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore.uis nostrud exercitationullamco laboris nisi ut aliquip ex ea commodo consequat",
      backgroundImage:
        "http://localhost:4000/api/waste/photo/9c534cc6-91b1-4d31-85ac-60f3a117599b.png",
      logo: "http://localhost:4000/api/waste/photo/30609816-1405-4b79-a6ee-600bb6e558c3.png",
      smallLogo:
        "http://localhost:4000/api/waste/photo/5ccc7f26-a334-45df-9c6b-a351fd36042c.png",
      userLoyaltyCode: "6059085d5d5d5d5d5",
    },
  ];

  test("it renders Retailer list", async () => {
    store.dispatch(setUser({ user: "mock" }));
    render(
      <TestEnvironment store={store}>
        <RetailerList retailers={mockRetailers} to="pathname" />
      </TestEnvironment>
    );
  });

  test("it renders add retailer link", async () => {
    render(
      <TestEnvironment store={store}>
        <RetailerList retailers={mockRetailers} to="rewards" />
      </TestEnvironment>
    );
    expect(screen.getByTestId("change-retailer-code")).toHaveProperty(
      "href",
      "http://localhost/rewards?retailer=1"
    );
  });
});
