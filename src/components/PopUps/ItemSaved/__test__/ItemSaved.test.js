import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import React from "react";
import ItemSaved from "../index";
import store from "../../../../store";
import TestEnvironment from "../../../ForTestWriting/TestEnvironment";

describe("ItemSaved", () => {
  test("ItemSaved will render", async () => {
    render(
      <TestEnvironment store={store}>
        <ItemSaved setShow={() => {}} />
      </TestEnvironment>
    );
  });
});
