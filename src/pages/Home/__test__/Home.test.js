import React from "react";
import { act, render } from "@testing-library/react";
import Home from "../index";
import store from "../../../store";
import { setUser } from "../../../actions/user";
import TestEnvironment from "../../../components/ForTestWriting/TestEnvironment";

jest.mock("../../../utils/http");
jest.mock("../../../utils/useApiCall", () => () => jest.fn(() => {}));

describe("Home", () => {
  afterEach(() => {
    act(() => {
      store.dispatch(setUser(null));
    });
  });

  test("it renders Home page", async () => {
    render(
      <TestEnvironment store={store}>
        <Home />
      </TestEnvironment>
    );
  });

  test("it redirect to sign-in if user not logged in(no user in local storage)", async () => {
    const { container } = render(
      <TestEnvironment store={store}>
        <Home />
      </TestEnvironment>
    );
    expect(container.querySelector("a")).toHaveProperty(
      "href",
      "http://localhost/sign-in"
    );
  });

  test("it redirect to recycling bin if user is logged in", async () => {
    store.dispatch(setUser({ user: "mock" }));

    const { container } = render(
      <TestEnvironment store={store}>
        <Home />
      </TestEnvironment>
    );
    expect(container.querySelector("a")).toHaveProperty(
      "href",
      "http://localhost/recycling-bin"
    );
  });
});
