import React from "react";
import { render } from "@testing-library/react";
import NoCoupons from "../index";
import TestEnvironment from "../../ForTestWriting/TestEnvironment";

describe("NoCoupons", () => {
  test("it renders NoCoupons", async () => {
    render(
      <TestEnvironment>
        <NoCoupons />
      </TestEnvironment>
    );
  });
});
