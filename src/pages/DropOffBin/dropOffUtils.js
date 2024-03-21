export const splitProductsByWasteAcceptance = (
  products,
  availableCategoryIds
) => {
  const acceptedProducts = [];
  const notAcceptedProducts = [];
  products.forEach((product) => {
    if (availableCategoryIds.includes(product.categoryId)) {
      acceptedProducts.push(product);
    } else {
      notAcceptedProducts.push(product);
    }
  });

  return [acceptedProducts, notAcceptedProducts];
};
