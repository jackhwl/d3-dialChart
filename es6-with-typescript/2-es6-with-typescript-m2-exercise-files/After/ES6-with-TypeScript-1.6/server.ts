
import * as Hapi from 'hapi';

let server = new Hapi.Server();
server.connection({host: 'localhost', port: 3000});

server.route({
  path: '/',
  method: 'GET',
  handler: {
    file: 'public/index.html'
  }
});

server.route({
  path: '/{path*}',
  method: 'GET',
  handler: {
    directory: {
      path: './public',
      listing: false
    }
  }
});

server.route({
  path: '/Let/{path*}',
  method: 'GET',
  handler: {
    directory: {
      path: './Let',
      listing: false
    }
  }
});

server.start(() => {
    console.log(`Listening on ${server.info.uri}`);
})
