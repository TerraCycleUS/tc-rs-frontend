import React from "react";
import { render } from "@testing-library/react";
import PictureExport from "../index";
import "@testing-library/jest-dom";

describe("PictureExport", () => {
  test("it renders PictureExport component", async () => {
    render(<PictureExport />);
  });
});
