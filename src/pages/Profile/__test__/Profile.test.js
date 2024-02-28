import React from "react";
import { act, render, screen } from "@testing-library/react";
import Profile from "../index";
import store from "../../../store";
import TestEnvironment from "../../../components/ForTestWriting/TestEnvironment";
import { setUser } from "../../../actions/user";

const userMock = {
  id: 1,
  name: "Vasyl Rebresh",
  email: "rebresh32@gmail.com",
  zipcode: "80016",
  socialUid: "106592",
  socialProvider: "GOOGLE",
  status: "ACTIVATED",
  retailerId: null,
  lang: "en",
  authorization: "eyJSFL9js",
  availableAmount: 0,
  totalAmount: 3,
  recycledAmount: 3,
};

jest.mock("../../../utils/http");
jest.mock("../../../utils/useApiCall", () => () => jest.fn(() => {}));

describe("Profile", () => {
  beforeEach(() => {
    act(() => {
      store.dispatch(setUser(null));
    });
  });

  test("it trows an error if there is no user", async () => {
    expect(() =>
      render(
        <TestEnvironment store={store}>
          <Profile />
        </TestEnvironment>
      )
    ).toThrow();
  });

  test("it renders Profile page if there is user", async () => {
    await act(() => {
      store.dispatch(setUser({ ...userMock }));
    });
    render(
      <TestEnvironment store={store}>
        <Profile />
      </TestEnvironment>
    );
  });

  test("it has correct history link", async () => {
    await act(() => {
      store.dispatch(setUser({ ...userMock }));
    });
    render(
      <TestEnvironment store={store}>
        <Profile />
      </TestEnvironment>
    );
    expect(screen.getByTestId("history-link")).toHaveProperty(
      "href",
      "http://localhost/history"
    );
  });

  test("it has correct retailers link", async () => {
    await act(() => {
      store.dispatch(setUser({ ...userMock }));
    });
    render(
      <TestEnvironment store={store}>
        <Profile />
      </TestEnvironment>
    );

    expect(screen.getByText("Retailer loyalty ID")).toHaveProperty(
      "href",
      "http://localhost/retailer-list"
    );
  });

  test("it has correct change language link", async () => {
    await act(() => {
      store.dispatch(setUser({ ...userMock }));
    });
    render(
      <TestEnvironment store={store}>
        <Profile />
      </TestEnvironment>
    );
    expect(screen.getByText("Language")).toHaveProperty(
      "href",
      "http://localhost/language"
    );
  });

  test("it has correct FAQ link", async () => {
    await act(() => {
      store.dispatch(setUser({ ...userMock }));
    });
    render(
      <TestEnvironment store={store}>
        <Profile />
      </TestEnvironment>
    );
    expect(screen.getByText("FAQ")).toHaveProperty(
      "href",
      "http://localhost/faq"
    );
  });

  test("it has correct tutorial link", async () => {
    await act(() => {
      store.dispatch(setUser({ ...userMock }));
    });
    render(
      <TestEnvironment store={store}>
        <Profile />
      </TestEnvironment>
    );
    expect(screen.getByText("Tutorial")).toHaveProperty(
      "href",
      "http://localhost/tutorial"
    );
  });

  test("it has correct terms and conditions link", async () => {
    await act(() => {
      store.dispatch(setUser({ ...userMock }));
    });
    render(
      <TestEnvironment store={store}>
        <Profile />
      </TestEnvironment>
    );
    expect(screen.getByText("Terms and conditions")).toHaveProperty(
      "href",
      "http://localhost/terms"
    );
  });

  test("it has correct privacy policy link", async () => {
    await act(() => {
      store.dispatch(setUser({ ...userMock }));
    });
    render(
      <TestEnvironment store={store}>
        <Profile />
      </TestEnvironment>
    );
    expect(screen.getByText("Privacy policy")).toHaveProperty(
      "href",
      "http://localhost/privacy"
    );
  });

  test("it has correct contact us link", async () => {
    await act(() => {
      store.dispatch(setUser({ ...userMock }));
    });
    render(
      <TestEnvironment store={store}>
        <Profile />
      </TestEnvironment>
    );
    expect(screen.getByTestId("contactUs-link")).toHaveProperty(
      "href",
      "http://localhost/contact-us"
    );
  });
});
