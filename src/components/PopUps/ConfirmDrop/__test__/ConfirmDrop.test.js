import React from "react";
import { render } from "@testing-library/react";
import ConfirmDrop from "../index";
import TestEnvironment from "../../../ForTestWriting/TestEnvironment";

describe("ConfirmDrop", () => {
  test("it renders ConfirmDrop", async () => {
    render(
      <TestEnvironment>
        <ConfirmDrop setShowPop={() => {}} />
      </TestEnvironment>
    );
  });
});
