var http = require("http");
const url = require("url");

http
  .createServer(function (req, res) {
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    });

    const reqUrl = url.parse(req.url).pathname;

    if (reqUrl === "/carslist") {
      res.write(JSON.stringify(getCarsList()));
    }
    res.end();
  })
  .listen(8082);

function getCarsList() {
  let output = [];
  for (let i = 0; i < 10; i++) {
    let obj = {
      id: Math.floor(Math.random() * 100000),
      name: "renault",
    };
    output.push(obj);
  }
  return output;
}
