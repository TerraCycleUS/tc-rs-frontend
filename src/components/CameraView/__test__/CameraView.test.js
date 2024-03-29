import React from "react";
import { render } from "@testing-library/react";
import TestEnvironment from "../../ForTestWriting/TestEnvironment";
import store from "../../../store";
import CameraView from "..";

jest.mock("../../../utils/http");
jest.mock("../../../utils/useApiCall", () => () => jest.fn(() => {}));

describe("CameraView", () => {
  beforeEach(() => {
    const mockGetUserMedia = jest.fn(
      async () =>
        new Promise((resolve) => {
          resolve();
        })
    );

    global.navigator.mediaDevices = {
      enumerateDevices: jest.fn(),
    };

    Object.defineProperty(global.navigator, "mediaDevices", {
      value: {
        getUserMedia: mockGetUserMedia,
      },
    });

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
    }));
  });

  test("it renders CameraView", async () => {
    render(
      <TestEnvironment store={store}>
        <CameraView goTo="/" />
      </TestEnvironment>
    );
  });
});
