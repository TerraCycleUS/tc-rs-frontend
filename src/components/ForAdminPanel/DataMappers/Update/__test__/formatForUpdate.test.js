import formatForUpdate from "../formatForUpdate";
import "@testing-library/jest-dom";

jest.mock("../../../../../utils/http", () => ({
  post: () => ({ data: { name: "image123.png" } }),
}));

describe("formatForUpdate", () => {
  test("formatForCreate will return input data if no expected resource was provided", async () => {
    const mockRetailer = {
      backgroundImage: { rawFile: {} },
      description: "<p>Mock description</p>",
      logo: { rawFile: {} },
      name: "Mock Retailer",
      smallLogo: { rawFile: {} },
    };

    expect(formatForUpdate("404", mockRetailer, "en", null)).toStrictEqual(
      mockRetailer
    );
  });

  test("formatForCreate will return correct retailer object if provided with retailer resource", async () => {
    const mockRetailer = {
      backgroundImage: "oldImage",
      description: "<p>Mock description</p>",
      logo: { rawFile: {} },
      name: "Mock Retailer",
      smallLogo: { rawFile: {} },
    };

    const mappedMockRetailer = {
      backgroundImage: "oldImage",
      description: "<p>Mock description</p>",
      logo: `${process.env.REACT_APP_SERVER_API_URL}/api/file/image123.png`,
      name: "Mock Retailer",
      smallLogo: `${process.env.REACT_APP_SERVER_API_URL}/api/file/image123.png`,
      langId: "en",
    };

    formatForUpdate("retailer", mockRetailer, "en", null).then((data) => {
      expect(data).toStrictEqual(mappedMockRetailer);
    });
  });

  test("formatForCreate will return correct user object if provided with user resource", async () => {
    const mockUser = {
      retailerId: "",
      name: "mock",
      status: "status",
      id: "id",
      role: "USER",
      lastLogin: " 356432",
      lastLogout: " 356432",
      isTwoFaEnabled: true,
    };

    const mappedMockUser = {
      retailerId: null,
      name: "mock",
    };

    expect(formatForUpdate("user", mockUser, "en", null)).toStrictEqual(
      mappedMockUser
    );
  });

  test("formatForCreate will return correct coupon object if provided with coupon resource", async () => {
    const mockCoupon = {
      id: 24,
      availableDays: 8,
      backgroundImage: { rawFile: {} },
      brand: "Palmolive",
      brandLogo: "oldImage",
      categoryId: 10,
      description:
        "<h1>Save up to 15% on selected Gillette disposable razor! This offer is available in store.May not be available online. Limit one coupon per purchase of products ayjynd quantities stated.Coupons not authorized if purchasing products for <i>resale.5</i></h1><p>&nbsp;</p>",
      discount: 45,
      eanCodePicURL: "oldImage",
      endDate: "2023-05-23T07:56:14.275Z",
      langId: "fr",
      minimumPurchaseAmount: 0,
      name: "Name 1046",
      requiredAmount: 1,
      startDate: "2023-03-02T00:00:00.000Z",
      status: "ACTIVE",
      storeIds: [181],
      retailerId: 2,
      createdAt: "2023-03-23T08:56:14.276Z",
      updatedAt: "2023-05-12T07:47:41.157Z",
    };

    const mappedMockCoupon = {
      availableDays: 8,
      backgroundImage: `${process.env.REACT_APP_SERVER_API_URL}/api/file/image123.png`,
      brand: "Palmolive",
      brandLogo: "oldImage",
      categoryId: 10,
      description:
        "<h1>Save up to 15% on selected Gillette disposable razor! This offer is available in store.May not be available online. Limit one coupon per purchase of products ayjynd quantities stated.Coupons not authorized if purchasing products for <i>resale.5</i></h1><p>&nbsp;</p>",
      discount: 45,
      eanCodePicURL: "oldImage",
      endDate: "2023-05-23T07:56:14.275Z",
      langId: "en",
      minimumPurchaseAmount: 0,
      name: "Name 1046",
      requiredAmount: 1,
      startDate: "2023-03-02T00:00:00.000Z",
      status: "ACTIVE",
      storeIds: [181],
    };

    formatForUpdate("coupon", mockCoupon, "en", null).then((data) => {
      expect(data).toStrictEqual(mappedMockCoupon);
    });
  });
});
