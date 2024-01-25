import React from "react";
import { render, screen } from "@testing-library/react";
import PasswordSetup from "../index";
import TestEnvironment from "../../../components/ForTestWriting/TestEnvironment";
import "@testing-library/jest-dom";
import store from "../../../store";

jest.mock("../../../utils/http");
jest.mock("../../../utils/useApiCall", () => () => jest.fn(() => {}));

describe("PasswordSetup", () => {
  test("it renders PasswordSetup page", async () => {
    render(
      <TestEnvironment store={store}>
        <PasswordSetup />
      </TestEnvironment>
    );
  });

  test("it has sign-in link", async () => {
    render(
      <TestEnvironment store={store}>
        <PasswordSetup />
      </TestEnvironment>
    );
    expect(screen.getByTestId("link-to-sign-in")).toHaveProperty(
      "href",
      "http://localhost/sign-in"
    );
  });
});
