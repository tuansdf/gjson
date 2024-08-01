import { Hono } from "hono";
import { fakerRouter } from "~/faker/faker.router";

const app = new Hono();

app.route("/", fakerRouter);

app.notFound((c) => {
  return c.json({ message: "Not Found" }, 404);
});
app.onError((err, c) => {
  return c.json({ message: "Something Went Wrong" }, 500);
});

const port = process.env.PORT || 5000;
console.log(`Server is running on port ${port}`);

export default {
  fetch: app.fetch,
  port,
};
