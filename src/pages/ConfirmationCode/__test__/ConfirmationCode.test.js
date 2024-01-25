import React from "react";
import { render } from "@testing-library/react";
import TestEnvironment from "../../../components/ForTestWriting/TestEnvironment";
import store from "../../../store";
import ConfirmationCode from "..";

jest.mock("../../../utils/http");
jest.mock("../../../utils/useApiCall", () => () => jest.fn(() => {}));

describe("ConfirmationCode ", () => {
  test("it renders Confirmation code page", async () => {
    render(
      <TestEnvironment store={store}>
        <ConfirmationCode />
      </TestEnvironment>
    );
  });
});
