import React from "react";
import { render } from "@testing-library/react";
import TestEnvironment from "../../ForTestWriting/TestEnvironment";
import store from "../../../store";
import FooterNav from "..";

jest.mock("../../../utils/http");
jest.mock("../../../utils/useApiCall", () => () => jest.fn(() => {}));

describe("FooterNav", () => {
  test("it renders FooterNav", async () => {
    render(
      <TestEnvironment store={store}>
        <FooterNav />
      </TestEnvironment>
    );
  });
});
