import React from "react";
import { render } from "@testing-library/react";
import TestEnvironment from "../../ForTestWriting/TestEnvironment";
import store from "../../../store";
import EditMonoprixLoyaltyId from "..";

jest.mock("../../../utils/http");
jest.mock("../../../utils/useApiCall", () => () => jest.fn(() => {}));

describe("EditMonoprixLoyaltyId ", () => {
  test("it renders EditMonoprixLoyaltyId page", async () => {
    render(
      <TestEnvironment store={store}>
        <EditMonoprixLoyaltyId />
      </TestEnvironment>
    );
  });
});
