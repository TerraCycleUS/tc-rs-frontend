import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import React from "react";
import CreateNow from "../index";
import store from "../../../../store";
import TestEnvironment from "../../../ForTestWriting/TestEnvironment";

describe("CreateNow", () => {
  test("CreateNow will render", async () => {
    render(
      <TestEnvironment store={store}>
        <CreateNow />
      </TestEnvironment>
    );
  });
});
