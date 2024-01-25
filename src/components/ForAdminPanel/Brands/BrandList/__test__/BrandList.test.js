import React from "react";
import { render } from "@testing-library/react";
import { AdminContext, Resource } from "react-admin";
import BrandList from "../index";
import "@testing-library/jest-dom";

jest.mock("../../../../../utils/http");
jest.mock("../../../../../utils/useApiCall", () => () => jest.fn(() => {}));

describe("BrandList", () => {
  test("it renders BrandList component", async () => {
    render(
      <AdminContext>
        <Resource name="brand" list={BrandList} />
      </AdminContext>
    );
  });
});
