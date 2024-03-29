import React from "react";
import { render, screen } from "@testing-library/react";
import DetailsPopup from "../index";
import TestEnvironment from "../../../../components/ForTestWriting/TestEnvironment";
import "@testing-library/jest-dom";
import store from "../../../../store";

jest.mock("../../../../utils/http");
jest.mock("../../../../utils/useApiCall", () => () => jest.fn(() => {}));

describe("DetailsPopup", () => {
  const onClose = jest.fn();
  const onClick = jest.fn();
  const mockItem = {
    address: "CC la Vache Noire Place de la Vache Noire",
    location: "ARCUEIL VACHE NOIRE",
    _tel: "01.49.85.83.30",
    city: "ARCUEIL",
    id: 0,
    retailerId: 1,
  };
  const searchParams = new URLSearchParams({
    query: `${mockItem.address},${mockItem.city}`,
  });
  const searchLink = `${
    process.env.REACT_APP_GOOGLE_MAPS_SEARCH_LINK
  }&${searchParams.toString()}`;

  test("it renders DetailsPopup", async () => {
    render(
      <TestEnvironment store={store}>
        <DetailsPopup item={mockItem} onClick={onClick} onClose={onClose} />
      </TestEnvironment>
    );
  });

  test("it has proper navigate link", async () => {
    render(
      <TestEnvironment store={store}>
        <DetailsPopup item={mockItem} onClick={onClick} onClose={onClose} />
      </TestEnvironment>
    );
    expect(screen.getByTestId("navigate-link-icon")).toHaveProperty(
      "href",
      searchLink
    );
  });

  test("it has proper navigate link", async () => {
    render(
      <TestEnvironment store={store}>
        <DetailsPopup item={mockItem} onClick={onClick} onClose={onClose} />
      </TestEnvironment>
    );
    expect(screen.getByTestId("learn-more-link-icon")).toHaveProperty(
      "href",
      `${window.location.protocol}//${window.location.hostname}${process.env.REACT_APP_MAP_ITEM_LEARN_MORE_LINK}`
    );
  });
});
