import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import React from "react";
import ChooseRetailers, { RetailerCheckBox, CheckRetailer } from "../index";
import store from "../../../../store";
import TestEnvironment from "../../../ForTestWriting/TestEnvironment";

describe("ChooseRetailers", () => {
  test("ChooseRetailers will render", async () => {
    render(
      <TestEnvironment store={store}>
        <ChooseRetailers retailers={[]} setRetailers={() => {}} />
      </TestEnvironment>
    );
  });

  test("RetailerCheckBox ", async () => {
    render(<RetailerCheckBox input={{ mock: "mock" }} id={2} />);
  });

  test("CheckRetailer ", async () => {
    render(
      <CheckRetailer
        retailers={[{ id: 0, name: "Mock" }]}
        setRetailers={() => {}}
      />
    );
  });
});
