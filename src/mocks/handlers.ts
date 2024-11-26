import { http, HttpResponse } from "msw";

const workers = Array.from({ length: 100 }, (_, index) => ({
  id: `ID-${index + 1}`,
  firstName: `firstName-${index + 1}`,
  lastName: `lastName-${index + 1}`,
}));

export const handlers = [
  // And here's a request handler with MSW
  // for the same "GET /user" request that
  // responds with a mock JSON response.
  http.get("https://crystal/workers", ({ request }) => {
    return HttpResponse.json({
      data: workers,
      status: 200,
    });
  }),
];
