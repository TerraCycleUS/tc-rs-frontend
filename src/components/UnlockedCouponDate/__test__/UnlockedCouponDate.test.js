import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import React from "react";
import UnlockedCouponDate, { Waiting, Ready } from "../index";
import store from "../../../store";
import TestEnvironment from "../../ForTestWriting/TestEnvironment";

describe("UnlockedCouponDate", () => {
  test("UnlockedCouponDate will render", async () => {
    render(
      <TestEnvironment store={store}>
        <UnlockedCouponDate
          startDate="2023"
          forLanding
          status="other"
          expirationDate="2023"
        />
      </TestEnvironment>
    );
  });

  test("Waiting ", async () => {
    render(
      <TestEnvironment store={store}>
        <Waiting startDate="2023" landingClass="mockClass" />
      </TestEnvironment>
    );
  });

  test("Ready ", async () => {
    render(
      <TestEnvironment store={store}>
        <Ready endDate="2023" landingClass="mockClass" status="ACTIVE" />
      </TestEnvironment>
    );
  });
});
