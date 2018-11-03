var Hapi = require('hapi');
var server = new Hapi.Server();
server.connection({ host: 'localhost', port: 3000 });
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
server.route({
    path: '/Modules/{path*}',
    method: 'GET',
    handler: {
        directory: {
            path: './Modules',
            listing: false
        }
    }
});
server.route({
    path: '/scripts/jquery/{path*}',
    method: 'GET',
    handler: {
        directory: {
            path: './node_modules/jquery/dist',
            listing: false
        }
    }
});
server.route({
    path: '/scripts/require/{path*}',
    method: 'GET',
    handler: {
        directory: {
            path: './node_modules/requirejs',
            listing: false
        }
    }
});
server.route({
    path: '/scripts/systemjs/{path*}',
    method: 'GET',
    handler: {
        directory: {
            path: './node_modules/systemjs/dist',
            listing: false
        }
    }
});
server.start(function () {
    console.log("Listening on " + server.info.uri);
});
