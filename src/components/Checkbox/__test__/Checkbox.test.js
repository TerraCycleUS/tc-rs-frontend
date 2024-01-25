import React from "react";
import { render } from "@testing-library/react";
import TestEnvironment from "../../ForTestWriting/TestEnvironment";
import store from "../../../store";
import Checkbox from "..";

jest.mock("../../../utils/http");
jest.mock("../../../utils/useApiCall", () => () => jest.fn(() => {}));

describe("Checkbox", () => {
  test("it renders Checkbox", async () => {
    render(
      <TestEnvironment store={store}>
        <Checkbox />
      </TestEnvironment>
    );
  });
});
