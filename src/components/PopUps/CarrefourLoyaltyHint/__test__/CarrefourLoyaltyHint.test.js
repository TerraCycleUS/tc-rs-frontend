import React from "react";
import { render } from "@testing-library/react";
import CarrefourLoyaltyHint from "../index";
import TestEnvironment from "../../../ForTestWriting/TestEnvironment";

describe("CarrefourLoyaltyHint", () => {
  test("it renders CarrefourLoyaltyHint", async () => {
    render(
      <TestEnvironment>
        <CarrefourLoyaltyHint />
      </TestEnvironment>
    );
  });
});
