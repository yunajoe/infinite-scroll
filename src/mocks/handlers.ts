import { http, HttpResponse } from "msw";

const workers = Array.from({ length: 100 }, (_, index) => ({
  id: `ID-${index}`,
  firstName: `firstName-${index}`,
  lastName: `lastName-${index}`,
}));

export const handlers = [
  // And here's a request handler with MSW
  // for the same "GET /user" request that
  // responds with a mock JSON response.
  http.get("https://crystarvisions/workers", ({ request }) => {
    return HttpResponse.json({
      data: workers,
      status: 200,
    });
  }),
];
