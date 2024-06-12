import React from "react";
import { render } from "@testing-library/react";
import Coupons from "../index";
import store from "../../../store";
import { setUser } from "../../../actions/user";
import TestEnvironment from "../../../components/ForTestWriting/TestEnvironment";
import { calculateCouponWeight } from "../couponsUtils";

jest.mock("../../../utils/http");
jest.mock("../../../utils/useApiCall", () => () => jest.fn(() => {}));

describe("Coupons", () => {
  test("it renders Coupons page", async () => {
    store.dispatch(setUser({ user: "mock" }));
    render(
      <TestEnvironment store={store}>
        <Coupons />
      </TestEnvironment>
    );
  });

  test("check calculateCouponWeight function", () => {
    const mockCouponReady1 = {
      requiredAmount: 10,
      discount: 15,
      retailerId: 1,
      availableAmount: 10,
    };

    const mockCouponReady2 = {
      requiredAmount: 10,
      discount: 25,
      retailerId: 2,
      availableAmount: 10,
    };

    const weight1 = calculateCouponWeight(mockCouponReady1);
    const weight2 = calculateCouponWeight(mockCouponReady2);

    expect(weight1).toBeGreaterThan(weight2);
  });
});
