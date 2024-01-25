import React from "react";
import { act, render, screen } from "@testing-library/react";
import CouponItems from "../index";
import store from "../../../store";
import { setUser } from "../../../actions/user";
import TestEnvironment from "../../ForTestWriting/TestEnvironment";
import "@testing-library/jest-dom";

const mockedCoupons = [
  {
    id: 2,
    name: "Gillette dispozable raizors Pack 4ct or larger",
    description:
      "Save up to 15% on selected Gillette disposable razor! This offer is available in store.May not be available online. Limit one coupon per purchase of products and quantities stated.Coupons not authorized if purchasing products for resale.",
    requiredAmount: 5,
    discount: 20,
    brandLogo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Monoprix_logo_2013.png/798px-Monoprix_logo_2013.png?20150903180052",
    startDate: "2022-09-19T00:00:00.000Z",
    endDate: "2023-01-01T00:00:00.000Z",
    backgroundImage:
      "https://tc-rs-stage.herokuapp.com/api/waste/photo/b8fa6525-7094-439f-9ffb-b0acdda959be.png",
    createdAt: "2022-08-04T19:58:56.881Z",
    updatedAt: "2022-09-20T16:17:12.126Z",
    availableAmount: 0,
  },
];

jest.mock("../../../utils/http");
jest.mock("../../../utils/useApiCall", () => () => jest.fn(() => {}));

describe("Coupon items", () => {
  afterEach(() => {
    act(() => {
      store.dispatch(setUser(null));
    });
  });

  test("it renders Coupons items with no coupons passed", async () => {
    store.dispatch(setUser({ user: "mock" }));
    render(
      <TestEnvironment store={store}>
        <CouponItems />
      </TestEnvironment>
    );
  });

  test("it renders Coupons items with coupons", async () => {
    store.dispatch(setUser({ user: "mock" }));
    render(
      <TestEnvironment store={store}>
        <CouponItems coupons={mockedCoupons} />
      </TestEnvironment>
    );
  });

  test("it renders button that navigates to landing if there are coupons", async () => {
    render(
      <TestEnvironment store={store}>
        <CouponItems coupons={mockedCoupons} />
      </TestEnvironment>
    );
    expect(screen.getByTestId("landing-btn")).toBeInTheDocument();
  });

  test("it does not render button that navigates to landing if there are no coupons", async () => {
    render(
      <TestEnvironment store={store}>
        <CouponItems />
      </TestEnvironment>
    );

    await expect(screen.findByTestId("landing-btn")).rejects.toBeInstanceOf(
      Error
    );
  });
});
