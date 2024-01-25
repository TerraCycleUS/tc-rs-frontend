import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Message from "../index";
import BackdropMessage from "../BackdropMessage";

describe("Message", () => {
  test("it renders Message", async () => {
    render(<Message />);
  });

  test("it renders BackdropMessage", async () => {
    render(<BackdropMessage />);
  });
});
