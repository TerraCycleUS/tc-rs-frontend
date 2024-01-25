import React from "react";
import { render } from "@testing-library/react";
import MonoprixCard from "../index";
import TestEnvironment from "../../../ForTestWriting/TestEnvironment";

describe("MonoprixCard", () => {
  test("it renders MonoprixCard", async () => {
    render(
      <TestEnvironment>
        <MonoprixCard />
      </TestEnvironment>
    );
  });
});
