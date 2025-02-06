import { onError, formatForApi } from "../adminUtils";
import "@testing-library/jest-dom";

describe("paginationSlice", () => {
  test("onError finds error message in body", async () => {
    const mockError1 = { error: { body: { errors: "OOps" } } };
    const mockError2 = { error: { body: { message: "Something went wrong" } } };

    expect(() => onError(mockError1, (text) => text)).not.toThrow();
    expect(() => onError(mockError2, (text) => text)).not.toThrow();
  });

  test("formatForApi returns date in form of time stamp", async () => {
    const inputData = "2023-02-09T15:25:04.009Z";

    expect(formatForApi(inputData)).toBe(1675956304009);
  });
});
