import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import React from "react";
import DeleteProduct from "../index";
import store from "../../../../store";
import TestEnvironment from "../../../ForTestWriting/TestEnvironment";

jest.mock("../../../../utils/http");
jest.mock("../../../../utils/useApiCall", () => () => jest.fn(() => {}));

describe("DeleteProduct", () => {
  test("DeleteProduct will render", async () => {
    render(
      <TestEnvironment store={store}>
        <DeleteProduct
          setShow={() => {}}
          setProducts={() => {}}
          productToDelete={1}
        />
      </TestEnvironment>
    );
  });
});
