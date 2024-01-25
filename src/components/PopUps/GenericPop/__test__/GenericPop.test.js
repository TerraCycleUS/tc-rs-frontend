import React from "react";
import { render } from "@testing-library/react";
import { PopContainer, PopWrapper } from "../index";

describe("GenericPop", () => {
  test("it renders PopContainer", async () => {
    render(<PopContainer />);
  });

  test("it renders PopWrapper", async () => {
    render(<PopWrapper />);
  });
});
