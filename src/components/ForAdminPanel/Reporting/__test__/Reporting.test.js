import React from "react";
import { render } from "@testing-library/react";
import Reporting from "../index";
import "@testing-library/jest-dom";

jest.mock("../../../../utils/http");
jest.mock("../../../../utils/useApiCall", () => () => jest.fn(() => {}));

describe("Reporting", () => {
  test("it renders Reporting component", async () => {
    render(<Reporting />);
  });
});
