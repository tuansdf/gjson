const { faker } = require("@faker-js/faker");
const fastify = require("fastify")();

const c = require("./constants");
const { clamp } = require("./numbers");

fastify.register(require("@fastify/cors"));
fastify.register(require("@fastify/helmet"));

const getGeneratedJSON = (queries, repeat) => {
  repeat = clamp(c.MIN_REPEAT, repeat, c.MAX_REPEAT) || c.DEFAULT_REPEAT;

  const result = [];

  for (let i = 0; i < repeat; i++) {
    result[i] = {};
    for (const [key, type] of Object.entries(queries)) {
      const [first, second] = type.split(c.METHODS_SEPARATOR);
      result[i][key] = faker[first]?.[second]?.();
    }
  }

  return repeat ? result : result[0];
};

fastify.get("*", function (request, reply) {
  const { _repeat, ...queries } = request.query;
  reply.send(getGeneratedJSON(queries, _repeat));
});

fastify.post("*", function (request, reply) {
  const { _repeat, ...queries } = request.body;
  reply.send(getGeneratedJSON(queries, _repeat));
});

// start server
const port = process.env.PORT || 5000;
fastify.listen({ port }, function (err, address) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Listening on port ${address}`);
});
