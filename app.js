#!/usr/bin/env node

const config = {
    "port": 8080
};
const path = require('path');

// Server, setup serving from ./static
const fastify = require('fastify')({
    logger: true
});
fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, 'static')
})

// List app routes
fastify.get('/list', function(request, reply) {
    reply.send({ hello: 'world' })
});

// Run the server!
fastify.listen(config, function(err, address) {
    if (err) throw err;
    // Server is now listening on ${address}
});
