// CommonJs
const fastify = require('fastify')({
    logger: true
});

// Declare a route
fastify.get('/', function(request, reply) {
    reply.send({ hello: 'world' })
});

// Run the server!
fastify.listen({ port: 8080 }, function(err, address) {
    if (err) throw err;
    // Server is now listening on ${address}
});
