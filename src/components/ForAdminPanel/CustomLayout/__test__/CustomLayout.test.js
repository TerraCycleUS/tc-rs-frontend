import React from "react";
import { render } from "@testing-library/react";
import { AdminContext } from "react-admin";
import CustomLayout, { CustomAppBar } from "../index";
import "@testing-library/jest-dom";

describe("CustomLayout", () => {
  test("it renders CustomMenu CustomLayout", async () => {
    render(
      <AdminContext>
        <CustomLayout />
      </AdminContext>
    );
  });

  test("it renders CustomAppBar", async () => {
    render(
      <AdminContext>
        <CustomAppBar />
      </AdminContext>
    );
  });
});
