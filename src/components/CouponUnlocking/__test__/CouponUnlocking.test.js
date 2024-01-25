import React from "react";
import { render } from "@testing-library/react";
import TestEnvironment from "../../ForTestWriting/TestEnvironment";
import store from "../../../store";
import RenderUnlocking, { CannotBeUnlocked, CanBeUnlocked } from "..";

jest.mock("../../../utils/http");
jest.mock("../../../utils/useApiCall", () => () => jest.fn(() => {}));

describe("CouponRequirement", () => {
  test("it renders RenderUnlocking", async () => {
    render(
      <TestEnvironment store={store}>
        <RenderUnlocking />
      </TestEnvironment>
    );
  });

  test("it renders CannotBeUnlocked", async () => {
    render(
      <TestEnvironment store={store}>
        <CannotBeUnlocked />
      </TestEnvironment>
    );
  });

  test("it renders CanBeUnlocked", async () => {
    render(
      <TestEnvironment store={store}>
        <CanBeUnlocked />
      </TestEnvironment>
    );
  });
});
