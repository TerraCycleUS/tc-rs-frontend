import AuthProvider from "../index";
import "@testing-library/jest-dom";

const userMock = {
  id: 1,
  name: "Terra Admin ytftyft",
  email: "recycle-and-save-admin@terracycle.com",
  zipcode: "3456565656",
  socialUid: null,
  socialProvider: null,
  status: "ACTIVATED",
  lang: "en",
  isTwoFaEnabled: true,
  role: "USER",
  authorization:
    "eyJUiOjE2ODQ4MzAzNzA0NTAsImlhdCI6MTY4NDgzMDM3MCwiZXhwIjoxNjg3NDIy",
  availableAmount: 1,
  totalAmount: 22,
  recycledAmount: 0,
};

jest.mock("../../../../utils/http", () => ({
  post: () => ({ data: { name: "image123.png" } }),
  get: () => ({ user: userMock }),
}));
jest.mock("../../../../store", () => ({
  dispatch: () => {},
  getState: () => ({ user: userMock }),
}));

const mockProvider = {
  login: expect.any(Function),
  checkError: expect.any(Function),
  checkAuth: expect.any(Function),
  logout: expect.any(Function),
  getIdentity: expect.any(Function),
};

const mockVerify = "147895";
const mockPassword = "passWWord11!##";
const mockEmail = "mick3@email.com";

describe("AuthProvider", () => {
  test("AuthProvider will return object with methods", async () => {
    expect(AuthProvider).toMatchObject(mockProvider);
  });

  test("login will resolve with no verificationCode", async () => {
    await expect(
      AuthProvider.login({
        password: mockPassword,
        verificationCode: null,
        email: mockEmail,
      })
    ).resolves.not.toThrow();
  });

  test("login will resolve with verificationCode", async () => {
    await expect(
      AuthProvider.login({
        password: mockPassword,
        verificationCode: mockVerify,
        email: mockEmail,
      })
    ).resolves.not.toThrow();
  });

  test("checkError status 401", async () => {
    await expect(
      AuthProvider.checkError({ status: 401 })
    ).rejects.not.toThrow();
  });

  test("checkError status 403", async () => {
    await expect(
      AuthProvider.checkError({ status: 403 })
    ).rejects.not.toThrow();
  });

  test('checkError status "anything else"', async () => {
    await expect(
      AuthProvider.checkError({ status: "anything else" })
    ).resolves.not.toThrow();
  });

  test("checkAuth rejects if role USER", async () => {
    await expect(AuthProvider.checkAuth()).rejects.not.toThrow();
  });

  test("logout resolves", async () => {
    await expect(AuthProvider.logout()).resolves.not.toThrow();
  });

  test("getIdentity resolves", async () => {
    await expect(AuthProvider.getIdentity()).resolves.not.toThrow();
  });

  test("getPermissions resolves", async () => {
    await expect(AuthProvider.getPermissions()).resolves.not.toThrow();
  });
});
