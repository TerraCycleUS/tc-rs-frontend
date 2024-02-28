import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import MapPointList from "../index";
import store from "../../../store";
import TestEnvironment from "../../ForTestWriting/TestEnvironment";

describe("MapPointList", () => {
  const mockLocation = [
    {
      id: 181,
      location: "Carrefour Angoulins",
      brand: "Carrefour",
      address: "lkjhgfd",
      zipcode: "187657690",
      city: "Angoulins",
      tel: null,
      lng: -34343,
      lat: 444444,
      retailerId: 2,
      createdAt: "2023-02-09T15:25:04.009Z",
      updatedAt: "2023-02-09T15:25:04.009Z",
    },
    {
      id: 182,
      location: "Carrefour Évreux",
      brand: "Carrefour",
      address: "AAA swdfw 13",
      zipcode: "33330",
      city: "Guichainville",
      tel: null,
      lng: 144,
      lat: 4446,
      retailerId: 2,
      createdAt: "2023-02-09T15:25:04.009Z",
      updatedAt: "2023-02-09T15:25:04.009Z",
    },
    {
      id: 183,
      location: "Carrefour Laval",
      brand: "Carrefour",
      address: "444 rgrg",
      zipcode: "540",
      city: "Laval",
      tel: null,
      lng: -2229,
      lat: 45555533,
      retailerId: 2,
      createdAt: "2023-02-09T15:25:04.009Z",
      updatedAt: "2023-02-09T15:25:04.009Z",
    },
    {
      id: 184,
      location: "Carrefour Nice Lingostière",
      brand: "Carrefour",
      address: "sffwfur 44",
      zipcode: "06200",
      city: "Nice",
      tel: null,
      lng: 936,
      lat: 2228912,
      retailerId: 2,
      createdAt: "2023-02-09T15:25:04.009Z",
      updatedAt: "2023-02-09T15:25:04.009Z",
    },
    {
      id: 185,
      location: "Carrefour Vaulx en Velin",
      brand: "Carrefour",
      address: "23334 osevelt",
      zipcode: "69120",
      city: "Vaulx-en-Velin",
      tel: null,
      lng: 44206,
      lat: 41,
      retailerId: 2,
      createdAt: "2023-02-09T15:25:04.009Z",
      updatedAt: "2023-02-09T15:25:04.009Z",
    },
    {
      id: 186,
      location: "Carrefour Athis-Mons",
      brand: "Carrefour",
      address: " 7",
      zipcode: "91200",
      city: "Athis Mons",
      tel: null,
      lng: 11111111,
      lat: 333333,
      retailerId: 2,
      createdAt: "2023-02-09T15:25:04.009Z",
      updatedAt: "2023-02-09T15:25:04.009Z",
    },
  ];
  test("it renders MapPointList with empty searchValue", async () => {
    render(
      <TestEnvironment store={store}>
        <MapPointList
          locations={mockLocation}
          searchValue=""
          setCurrentItem={() => {}}
          retailers={[]}
        />
      </TestEnvironment>
    );
    screen.debug();
  });

  test("it renders MapPointList with  searchValue", async () => {
    render(
      <TestEnvironment store={store}>
        <MapPointList
          locations={mockLocation}
          searchValue="car"
          setCurrentItem={() => {}}
          retailers={[]}
        />
      </TestEnvironment>
    );
    screen.debug();
  });

  test("it renders MapPointList without location", async () => {
    render(
      <TestEnvironment store={store}>
        <MapPointList
          locations={[]}
          searchValue="car"
          setCurrentItem={() => {}}
          retailers={[]}
        />
      </TestEnvironment>
    );
    screen.debug();
  });
});
