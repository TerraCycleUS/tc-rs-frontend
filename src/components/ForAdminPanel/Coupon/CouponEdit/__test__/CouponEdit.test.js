import React from "react";
import { render } from "@testing-library/react";
import { AdminContext, Resource } from "react-admin";
import CouponEdit from "../index";
import "@testing-library/jest-dom";
import TestEnvironment from "../../../../ForTestWriting/TestEnvironment";
import store from "../../../../../store";

describe("CouponEdit", () => {
  test("it renders CouponEdit component", async () => {
    render(
      <TestEnvironment store={store} initialEntries={["/coupon/1"]}>
        <AdminContext>
          <Resource name="coupon" edit={CouponEdit} />
        </AdminContext>
      </TestEnvironment>
    );
  });
});
