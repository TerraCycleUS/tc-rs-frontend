import React from "react";
import { render } from "@testing-library/react";
import TestEnvironment from "../../../components/ForTestWriting/TestEnvironment";
import "@testing-library/jest-dom";
import EditLoyaltyId from "..";

jest.mock("../../../utils/http");
jest.mock("../../../utils/useApiCall", () => () => jest.fn(() => {}));

describe("EditLoyaltyId", () => {
  test("it renders EditLoyaltyId page", async () => {
    render(
      <TestEnvironment>
        <EditLoyaltyId />
      </TestEnvironment>
    );
  });
});
