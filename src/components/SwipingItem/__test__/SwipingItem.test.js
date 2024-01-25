import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import React from "react";
import SwipingItem from "../index";

describe("SwipingItem", () => {
  test("SwipingItem will render if provided with actionButtons prop", async () => {
    render(
      <SwipingItem
        actionButtons={[{ key: "5643rff", onClick: () => {}, role: "button" }]}
      />
    );
  });

  test("SwipingItem will render if provided with actionButtons prop", async () => {
    render(
      <SwipingItem
        actionButtons={[{ key: "5h5y5y99", onClick: () => {}, role: "button" }]}
        height={80}
        actionButtonMinWidth={80}
      >
        <div>Text</div>
      </SwipingItem>
    );
  });
});
