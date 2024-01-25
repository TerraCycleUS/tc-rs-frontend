import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestEnvironment from "../../../components/ForTestWriting/TestEnvironment";
import store from "../../../store";
import MonoprixId from "..";
import { setUser } from "../../../actions/user";
import "@testing-library/jest-dom";

jest.mock("../../../utils/http");
jest.mock("../../../utils/useApiCall", () => () => jest.fn(() => {}));

describe("MonoprixId ", () => {
  test("it renders MonoprixId page", async () => {
    store.dispatch(setUser({ authorization: "token" }));
    render(
      <TestEnvironment store={store}>
        <MonoprixId
          code="asdasd"
          isNum={false}
          setCode={(code) => code}
          submitHandler={() => {}}
        />
      </TestEnvironment>
    );
  });

  test("it renders MonoprixId different props", async () => {
    store.dispatch(setUser({ authorization: "token" }));
    render(
      <TestEnvironment store={store}>
        <MonoprixId
          code="9135720000000000000"
          isNum
          setCode={(code) => code}
          submitHandler={(code) => code}
        />
      </TestEnvironment>
    );
  });

  test("it renders MonoprixId invalid code", async () => {
    store.dispatch(setUser({ authorization: "token" }));
    render(
      <TestEnvironment store={store}>
        <MonoprixId
          code="000913"
          isNum
          setCode={() => {}}
          submitHandler={(code) => code}
        />
      </TestEnvironment>
    );

    expect(screen.getByTestId("submit-btn")).toHaveProperty("disabled");
  });

  test("it renders otp inputs", async () => {
    store.dispatch(setUser({ authorization: "token" }));
    render(
      <TestEnvironment store={store}>
        <MonoprixId
          code="000913"
          isNum
          setCode={() => {}}
          submitHandler={(code) => code}
        />
      </TestEnvironment>
    );

    expect(screen.getByTestId("otp-input-0")).toBeInTheDocument();
  });

  test("input typing works", async () => {
    store.dispatch(setUser({ authorization: "token" }));
    render(
      <TestEnvironment store={store}>
        <MonoprixId
          code="9999999"
          isNum
          setCode={() => {}}
          submitHandler={(code) => code}
        />
      </TestEnvironment>
    );

    await act(async () => {
      await userEvent.type(
        screen.getByTestId("otp-input-0"),
        "99999999999999999999999"
      );
    });

    expect(screen.getByTestId("otp-input-0")).toHaveValue("9");
  });

  test("input typing works", async () => {
    store.dispatch(setUser({ authorization: "token" }));
    render(
      <TestEnvironment store={store}>
        <MonoprixId
          code="9999999"
          isNum
          setCode={() => {}}
          submitHandler={(code) => code}
        />
      </TestEnvironment>
    );

    await act(async () => {
      await userEvent.type(
        screen.getByTestId("otp-input-0"),
        "99999999999999999999999"
      );
    });

    expect(screen.getByTestId("otp-input-0")).toHaveValue("9");
  });

  test("submit fires", async () => {
    store.dispatch(setUser({ authorization: "token" }));
    render(
      <TestEnvironment store={store}>
        <MonoprixId
          code="9999999999999999999999999999999999999999999999"
          isNum
          setCode={() => {}}
          submitHandler={(code) => code}
        />
      </TestEnvironment>
    );

    await act(async () => {
      await userEvent.click(screen.getByTestId("submit-btn"));
    });
  });
});
