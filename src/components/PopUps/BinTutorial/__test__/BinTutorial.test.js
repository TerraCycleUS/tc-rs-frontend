import React from "react";
import { render } from "@testing-library/react";
import BinTutorial from "../index";
import store from "../../../../store";
import TestEnvironment from "../../../ForTestWriting/TestEnvironment";

describe("BinTutorial", () => {
  test("it renders BinTutorial", async () => {
    render(
      <TestEnvironment store={store}>
        <BinTutorial />
      </TestEnvironment>
    );
  });
});
