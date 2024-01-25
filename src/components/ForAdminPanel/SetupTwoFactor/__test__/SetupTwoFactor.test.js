import React from "react";
import { render } from "@testing-library/react";
import { AdminContext } from "react-admin";
import "@testing-library/jest-dom";
import SetupTwoFactor from "../index";

jest.mock("../../../../utils/http");
jest.mock("../../../../utils/useApiCall", () => () => jest.fn(() => {}));

describe("SetupTwoFactor", () => {
  beforeEach(() => {
    // canvas mock
    HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
      fillRect: jest.fn(),
      clearRect: jest.fn(),
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      stroke: jest.fn(),
      arc: jest.fn(),
      fill: jest.fn(),
      drawImage: jest.fn(),
      putImageData: jest.fn(),
      setTransform: jest.fn(),
      save: jest.fn(),
      restore: jest.fn(),
      createImageData: () => ({}),
    }));
  });

  test("it renders SetupTwoFactor component", async () => {
    render(
      <AdminContext>
        <SetupTwoFactor />
      </AdminContext>
    );
  });
});
