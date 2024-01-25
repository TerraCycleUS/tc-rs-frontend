import React from "react";
import { render } from "@testing-library/react";
import { AdminContext, Resource } from "react-admin";
import CategoryList from "../index";
import "@testing-library/jest-dom";

jest.mock("../../../../../utils/http");
jest.mock("../../../../../utils/useApiCall", () => () => jest.fn(() => {}));

describe("CategoryList", () => {
  test("it renders CategoryList component", async () => {
    render(
      <AdminContext>
        <Resource name="category" list={CategoryList} />
      </AdminContext>
    );
  });
});
