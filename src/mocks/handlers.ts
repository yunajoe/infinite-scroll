import { http, HttpResponse } from "msw";

const users = Array.from({ length: 100 }, (_, index) => {
  return {
    id: `ID-${index + 1}`,
    firstName: `FirstName-${index + 1}`,
    lastName: `LastName-${index + 1}`,
  };
});

export const handlers = [
  http.get("https://crystarvisioin/workers", ({ request, params }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get("page") as string;
    const limit = url.searchParams.get("limit") as string;

    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;

    const startIndex = (pageNumber - 1) * limitNumber;
    const endIndex = startIndex + limitNumber;

    const paginatedUsers = users.slice(startIndex, endIndex);
    return HttpResponse.json({
      data: paginatedUsers,
      meta: {
        page,
        limit,
        totalCount: users.length,
      },
    });
  }),
];
