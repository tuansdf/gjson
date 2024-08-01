import { Hono } from "hono";
import { fakerService } from "~/faker/faker.service";

export const fakerRouter = new Hono();

fakerRouter.get("/", async (c) => {
  const input = c.req.query("input") || "";
  const data = JSON.parse(decodeURIComponent(input));
  const result = await fakerService.generateJsons(data);
  return c.json({ data: result }, 200);
});

fakerRouter.post("/", async (c) => {
  const data = await c.req.json();
  const result = await fakerService.generateJsons(data);
  return c.json({ data: result }, 200);
});
