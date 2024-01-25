import React from "react";
import { render } from "@testing-library/react";
import { AdminContext } from "react-admin";
import CustomLogin from "../index";
import "@testing-library/jest-dom";

jest.mock("../../../../utils/http");
jest.mock("../../../../utils/useApiCall", () => () => jest.fn(() => {}));

describe("CustomLogin", () => {
  test("it renders CustomLogin component", async () => {
    render(
      <AdminContext>
        <CustomLogin />
      </AdminContext>
    );
  });
});
