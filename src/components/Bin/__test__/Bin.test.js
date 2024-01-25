import React from "react";
import { render } from "@testing-library/react";
import TestEnvironment from "../../ForTestWriting/TestEnvironment";
import store from "../../../store";
import {
  getCategoryIcon,
  NoItemsWrapper,
  BinWrapper,
  ProductContainer,
  ProductDescription,
  ProductBrand,
  ProductCategory,
  ProductImage,
  CategoryContainer,
  CategoryName,
} from "..";

describe("Bin", () => {
  test("it renders getCategoryIcon", async () => {
    render(
      <TestEnvironment store={store}>{getCategoryIcon(2)}</TestEnvironment>
    );
  });

  test("it renders NoItemsWrapper", async () => {
    render(
      <TestEnvironment store={store}>
        <NoItemsWrapper />
      </TestEnvironment>
    );
  });

  test("it renders BinWrapper", async () => {
    render(
      <TestEnvironment store={store}>
        <BinWrapper>hmmmmmmmmm</BinWrapper>
      </TestEnvironment>
    );
  });

  test("it renders ProductContainer", async () => {
    render(
      <TestEnvironment store={store}>
        <ProductContainer>hmmmmmmmmm</ProductContainer>
      </TestEnvironment>
    );
  });

  test("it renders ProductDescription", async () => {
    render(
      <TestEnvironment store={store}>
        <ProductDescription>hmmmmmmmmm</ProductDescription>
      </TestEnvironment>
    );
  });

  test("it renders ProductBrand", async () => {
    render(
      <TestEnvironment store={store}>
        <ProductBrand>hmmmmmmmmm</ProductBrand>
      </TestEnvironment>
    );
  });

  test("it renders ProductCategory", async () => {
    render(
      <TestEnvironment store={store}>
        <ProductCategory>hmmmmmmmmm</ProductCategory>
      </TestEnvironment>
    );
  });

  test("it renders ProductImage", async () => {
    render(
      <TestEnvironment store={store}>
        <ProductImage src="3r3r3f3.png" />
      </TestEnvironment>
    );
  });

  test("it renders CategoryContainer", async () => {
    render(
      <TestEnvironment store={store}>
        <CategoryContainer>hmmmmmmmmm</CategoryContainer>
      </TestEnvironment>
    );
  });

  test("it renders CategoryName", async () => {
    render(
      <TestEnvironment store={store}>
        <CategoryName>hmmmmmmmmm</CategoryName>
      </TestEnvironment>
    );
  });
});
