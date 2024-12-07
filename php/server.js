var http = require("http");
http
  .createServer(function (req, res) {
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    });

    let output = [];
    for (let i = 0; i < 10; i++) {
      let obj = {
        id: Math.floor(Math.random() * 100000),
        name: "renault",
      };
      output.push(obj);
    }
    res.write(JSON.stringify(output));
    res.end();
  })
  .listen(8082);
