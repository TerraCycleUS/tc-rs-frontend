import React from "react";
import { render } from "@testing-library/react";
import CashTillBarcode from "../index";
import TestEnvironment from "../../../ForTestWriting/TestEnvironment";

describe("CashTillBarcode", () => {
  test("it renders CashTillBarcode", async () => {
    render(
      <TestEnvironment>
        <CashTillBarcode />
      </TestEnvironment>
    );
  });
});
