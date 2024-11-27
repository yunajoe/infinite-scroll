import { http, HttpResponse } from "msw";

const workers = Array.from({ length: 100 }, (_, index) => ({
  id: `ID-${index + 1}`,
  name: `Name-${index + 1}`,
}));

export const handlers = [
  // And here's a request handler with MSW
  // for the same "GET /user" request that
  // responds with a mock JSON response.
  http.get("https://crystal/workers", ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get("page") as string;
    const limit = url.searchParams.get("limit") as string;

    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;

    const startIndex = (pageNumber - 1) * limitNumber;
    const endIndex = startIndex + limitNumber;

    const paginatedworkers = workers.slice(startIndex, endIndex);

    return HttpResponse.json({
      data: paginatedworkers,
      page,
      limit,
      totalCount: workers.length,
    });
  }),
];
