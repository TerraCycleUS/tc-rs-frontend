import React from "react";
import { render } from "@testing-library/react";
import TestEnvironment from "../../../components/ForTestWriting/TestEnvironment";
import store from "../../../store";
import ChangePassword from "..";
import { setUser } from "../../../actions/user";

jest.mock("../../../utils/http");
jest.mock("../../../utils/useApiCall", () => () => jest.fn(() => {}));

describe("ChangePassword ", () => {
  test("it renders change password code page if user signed-in", async () => {
    store.dispatch(setUser({ user: "mock" }));
    render(
      <TestEnvironment store={store}>
        <ChangePassword />
      </TestEnvironment>
    );
  });
});
