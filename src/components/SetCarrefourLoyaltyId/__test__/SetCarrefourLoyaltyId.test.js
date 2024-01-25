import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import React from "react";
import SetCarrefourLoyaltyId, {
  luhnCheck,
  submitValidation,
  validatePass,
  validateCarrefour,
} from "../index";
import TestEnvironment from "../../ForTestWriting/TestEnvironment";
import store from "../../../store";

jest.mock("../../../utils/http");
jest.mock("../../../utils/useApiCall", () => () => jest.fn(() => {}));

describe("ChooseRetailers", () => {
  test("validatePass basic validation checks several pass card codes", async () => {
    expect(validatePass("0651111111172100")).toBe(true);
    expect(validatePass("0552222222251100")).toBe(true);
  });

  test("luhnCheck passes several pass card codes", async () => {
    // VALIDATION RULES
    // all PASS cards start with 05, 06 or 07
    // all PASS cards end with 100
    // the first 2 numbers and the last 4 numbers of the pass card identifier should not be taken into account when calculating the luhn key.
    // user does not know 103 part of the number, but it should be saved with it
    // number without 103 should be 16 characters
    // 19 with 103

    expect(luhnCheck("0651111111172100")).toBe(false);
    expect(luhnCheck("0552222222251100")).toBe(false);
    expect(luhnCheck("0651111111172100"?.slice(2, 12))).toBe(true);
    expect(luhnCheck("0552222222251100"?.slice(2, 12))).toBe(true);
  });

  test("validateCarrefour basic validation checks several pass card codes", async () => {
    expect(validateCarrefour("9135720651111111172")).toBe(true);
    expect(validateCarrefour("9135720552222222251")).toBe(true);
  });

  test("validateCarrefour basic validation checks several pass card codes", async () => {
    expect(validateCarrefour("9135720651111111172")).toBe(true);
    expect(validateCarrefour("9135720552222222251")).toBe(true);
  });

  test("validateCarrefour basic validation checks several pass card codes", async () => {
    expect(validateCarrefour("9135720000000000004")).toBe(true);
  });

  test("submitValidation will return both codes if both are correct. Object should also contain retailerId. Pass code will have 103", async () => {
    const expected = {
      retailerId: 1,
      userLoyaltyCode: "9135720000000000004",
      userLoyaltyPassCode: "1030651111111172100",
    };
    expect(
      submitValidation(
        "9135720000000000004",
        "0651111111172100",
        { carrefour: true, pass: true },
        () => {},
        1
      )
    ).toStrictEqual(expected);
  });

  test("SetCarrefourLoyaltyId will render", async () => {
    render(
      <TestEnvironment store={store}>
        <SetCarrefourLoyaltyId />
      </TestEnvironment>
    );
  });
});
