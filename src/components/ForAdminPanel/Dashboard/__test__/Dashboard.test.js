import React from "react";
import { render } from "@testing-library/react";
import { AdminContext } from "react-admin";
import Dashboard from "../index";
import "@testing-library/jest-dom";

jest.mock("../../../../utils/http");
jest.mock("../../../../utils/useApiCall", () => () => jest.fn(() => {}));

describe("Dashboard", () => {
  test("it renders Dashboard component", async () => {
    render(
      <AdminContext>
        <Dashboard />
      </AdminContext>
    );
  });
});
