import React from "react";
import { render } from "@testing-library/react";
import TestEnvironment from "../../../components/ForTestWriting/TestEnvironment";
import store from "../../../store";
import BarcodeScan from "..";
import { setUser } from "../../../actions/user";

jest.mock("../../../utils/http");
jest.mock("../../../utils/useApiCall", () => () => jest.fn(() => {}));

describe("BarcodeScan ", () => {
  beforeEach(() => {
    Object.defineProperty(window, "MediaStreamTrack", {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        start: jest.fn(),
        ondataavailable: jest.fn(),
        onerror: jest.fn(),
        state: "",
        stop: jest.fn(),
        pause: jest.fn(),
        resume: jest.fn(),
      })),
    });

    Object.defineProperty(window, "MediaRecorder", {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        start: jest.fn(),
        ondataavailable: jest.fn(),
        onerror: jest.fn(),
        state: "",
        stop: jest.fn(),
        pause: jest.fn(),
        resume: jest.fn(),
      })),
    });

    Object.defineProperty(MediaStreamTrack, "isTypeSupported", {
      writable: true,
      value: () => true,
    });

    Object.defineProperty(MediaRecorder, "isTypeSupported", {
      writable: true,
      value: () => true,
    });
  });

  test("it renders BarcodeScan page", async () => {
    store.dispatch(setUser({ user: "mock" }));
    render(
      <TestEnvironment store={store}>
        <BarcodeScan />
      </TestEnvironment>
    );
  });
});
