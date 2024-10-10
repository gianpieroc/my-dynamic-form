import { fetchItems } from "./api";

interface MockResponse extends Partial<Response> {
  ok: boolean;
  status: number;
  json: jest.Mock;
}

describe("fetchItems", () => {
  beforeEach(() => {
    global.fetch = jest.fn() as jest.Mock;
    console.error = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns data when fetch is successful", async () => {
    const mockData = [{ id: 1, type: "multiple", question: "Q1" }];

    const mockResponse: MockResponse = {
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue(mockData),
    };

    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    const result = await fetchItems();

    expect(result).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/data.json",
      {
        headers: {
          Accept: "application/json",
        },
      },
    );
  });

  it("logs an error if fetch returns 404 status", async () => {
    const mockResponse: MockResponse = {
      ok: false,
      status: 404,
      json: jest.fn(),
    };

    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    const result = await fetchItems();

    expect(result).toBeUndefined();
    expect(console.error).toHaveBeenCalledWith("Status: 404");
  });
});
