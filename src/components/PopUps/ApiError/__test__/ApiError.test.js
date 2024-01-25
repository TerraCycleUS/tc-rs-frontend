import React from "react";
import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import ApiError from "../index";
import store from "../../../../store";
import { setUser } from "../../../../actions/user";
import TestEnvironment from "../../../ForTestWriting/TestEnvironment";
jest.mock("../../../../utils/http");
jest.mock("../../../../utils/useApiCall", () => () => jest.fn(() => {}));
jest.mock("../../../../context/apiError", () => ({
  useApiErrorContext: () => [{ mock: 9000 }, null],
}));

describe("ApiError", () => {
  afterEach(() => {
    act(() => {
      store.dispatch(setUser(null));
    });
  });

  test("it renders ApiError", async () => {
    render(
      <TestEnvironment store={store}>
        <ApiError />
      </TestEnvironment>
    );
    expect(screen.getByTestId("It's us")).toBeInTheDocument();
  });
});
