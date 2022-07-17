const { faker } = require("@faker-js/faker");
const fastify = require("fastify")();

const c = require("./constants");
const { clamp } = require("./numbers");

fastify.register(require("@fastify/cors"));
fastify.register(require("@fastify/helmet"));

fastify.get("*", function (request, reply) {
  const { gjCount, ...queries } = request.query;

  let count = clamp(c.MIN_COUNT, gjCount, c.MAX_COUNT) || c.DEFAULT_COUNT;

  // the result array
  const objArr = [];

  for (let i = 0; i < count; i++) {
    // will be pushed into array
    const obj = {};

    for (const [key, types] of Object.entries(queries)) {
      const typeArr = types.split(c.TYPES_SEPARATOR);

      let tempArr = [];
      // generate random for each type
      for (const type of typeArr) {
        const [first, second] = type.split(c.METHOD_SEPARATOR);
        const temp = faker[first]?.[second]?.();
        // if type is valid, random is pushed into array
        if (temp) tempArr.push(temp);
      }

      obj[key] = tempArr.join(" ");
    }

    objArr.push(obj);
  }

  // if count is provided, return array, else return object
  reply.send(gjCount ? objArr : objArr[0]);
});

// start server
const port = process.env.PORT || 5000;
fastify.listen({ port }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Listening on port ${address}`);
});
