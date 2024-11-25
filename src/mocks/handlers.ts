import { delay, http, HttpResponse } from "msw";
const generateUsers = (totalUsers = 100) => {
  return Array.from({ length: totalUsers }, (_, index) => ({
    id: `user-${index + 1}`,
    firstName: `First-${index + 1}`,
    lastName: `Last-${index + 1}`,
  }));
};

const users = generateUsers(); // Generate 100 users

// Define the handler to return all 100 users
export const handlers = [
  http.get("https://example.com/user", async () => {
    // Return the 100 users in a single response
    await delay(1000);
    return HttpResponse.json(
      { users }, // Return the users array
      { status: 200 } // HTTP status code
    );
  }),
];
