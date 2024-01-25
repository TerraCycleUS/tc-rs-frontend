import React from "react";
import { render } from "@testing-library/react";
import TestEnvironment from "../../ForTestWriting/TestEnvironment";
import store from "../../../store";
import DropButton from "..";

jest.mock("../../../utils/http");
jest.mock("../../../utils/useApiCall", () => () => jest.fn(() => {}));

describe("DropButton", () => {
  test("it renders DropButton", async () => {
    render(
      <TestEnvironment store={store}>
        <DropButton />
      </TestEnvironment>
    );
  });
});
