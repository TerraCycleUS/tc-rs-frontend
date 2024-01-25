import React from "react";
import { render } from "@testing-library/react";
import PasswordSuccess from "../index";
import TestEnvironment from "../../../ForTestWriting/TestEnvironment";

describe("PasswordSuccess", () => {
  test("it renders PasswordSuccess", async () => {
    render(
      <TestEnvironment>
        <PasswordSuccess />
      </TestEnvironment>
    );
  });
});
