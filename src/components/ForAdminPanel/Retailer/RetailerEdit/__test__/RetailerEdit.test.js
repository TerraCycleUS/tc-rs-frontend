import React from "react";
import { render } from "@testing-library/react";
import { AdminContext, Resource } from "react-admin";
import RetailerEdit from "../index";
import "@testing-library/jest-dom";
import TestEnvironment from "../../../../ForTestWriting/TestEnvironment";
import store from "../../../../../store";

jest.mock("../../../../../utils/http");
jest.mock("../../../../../utils/useApiCall", () => () => jest.fn(() => {}));

describe("RetailerEdit", () => {
  test("it renders RetailerEdit component", async () => {
    render(
      <TestEnvironment store={store} initialEntries={["/retailer/1"]}>
        <AdminContext>
          <Resource name="retailer" edit={RetailerEdit} />
        </AdminContext>
      </TestEnvironment>
    );
  });
});
