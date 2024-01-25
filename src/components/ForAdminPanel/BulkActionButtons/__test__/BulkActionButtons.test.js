import React from "react";
import { render } from "@testing-library/react";
import { AdminContext } from "react-admin";
import BulkActionButtons from "../index";
import "@testing-library/jest-dom";

describe("BulkActionButtons", () => {
  test("it renders BulkActionButtons component", async () => {
    render(
      <AdminContext>
        <BulkActionButtons resource="brand" />
      </AdminContext>
    );
  });
});
