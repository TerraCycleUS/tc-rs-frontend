import React from "react";
import { render } from "@testing-library/react";
import { AdminContext, Resource } from "react-admin";
import PageEdit from "../index";
import "@testing-library/jest-dom";
import TestEnvironment from "../../../../ForTestWriting/TestEnvironment";
import store from "../../../../../store";
import { LangProvider } from "../../../../../context/adminLang";

jest.mock("../../../../../utils/http");
jest.mock("../../../../../utils/useApiCall", () => () => jest.fn(() => {}));

describe("PageEdit", () => {
  test("it renders PageEdit component", async () => {
    render(
      <TestEnvironment store={store} initialEntries={["/page/1"]}>
        <LangProvider>
          <AdminContext>
            <Resource name="page" edit={PageEdit} />
          </AdminContext>
        </LangProvider>
      </TestEnvironment>
    );
  });
});
