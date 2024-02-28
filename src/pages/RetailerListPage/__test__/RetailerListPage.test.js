import React from "react";
import { render, screen } from "@testing-library/react";
import RetailerListPage from "../index";
import store from "../../../store";
import { setUser } from "../../../actions/user";
import TestEnvironment from "../../../components/ForTestWriting/TestEnvironment";

jest.mock("../../../utils/http");
jest.mock("../../../utils/useApiCall", () => () => jest.fn(() => {}));

describe("RetailerListPage", () => {
  test("it renders Retailer list page", async () => {
    store.dispatch(setUser({ user: "mock" }));
    render(
      <TestEnvironment store={store}>
        <RetailerListPage />
      </TestEnvironment>
    );
  });

  test("it renders add retailer link", async () => {
    render(
      <TestEnvironment store={store}>
        <RetailerListPage />
      </TestEnvironment>
    );
    expect(screen.getByTestId("add-retailer")).toHaveProperty(
      "href",
      "http://localhost/registration/select-retailer?fromProfile=true"
    );
  });
});
