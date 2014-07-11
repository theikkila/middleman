var net = require('net');

var config = {
    localPort: 8080,
    remotePort: 8081,
    remoteAddr: "localhost"
};


var server = net.createServer(function (localSocket) {
    localSocket.on('data', function (l2r) {
        console.log('client >> remote\n', '\x1B[32m', l2r.toString(), '\x1B[39m');
        var remoteSocket = new net.Socket();
        remoteSocket.connect(parseInt(config.remotePort, 10), config.remoteAddr, function () {
            remoteSocket.write(l2r);
        });
        remoteSocket.on("data", function (r2l) {
            console.log('client << remote\n', '\x1B[34m', r2l.toString(), '\x1B[39m');
            localSocket.write(r2l);
        });
    });
});

server.listen(config.localPort);
console.log("TCP-proxy between Local (localhost:" + config.localPort + ") <> Remote (" + config.remoteAddr + ':' + config.remotePort + ')');
