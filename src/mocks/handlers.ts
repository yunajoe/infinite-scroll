import { http, HttpResponse } from "msw";

const workers = Array.from({ length: 100 }, (_, index) => ({
  id: `ID-${index}`,
  firstName: `FirstName-${index}`,
  lastName: `LastName-${index}`,
}));
export const handlers = [
  http.get("https://crystarvision/workers", () => {
    return HttpResponse.json(workers);
  }),
];
