console.log("First web service starting up ...");

// 1 - pull in the HTTP server module
const http = require('http'); 

// 2 - pull in URL module (for URL parsing)
const url = require('url');
const query = require('querystring');

// 3 - locally this will be 3000, on Heroku it will be assigned
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// 4 - here's our index page
const indexPage = `
<html>
  <head>
    <title>Random Number Web Service</title>
  </head>
  <body>
    <h1>Random Number Web Service</h1>
    <p>
      Random Number Web Service - the endpoint is here --> 
      <a href="/random-number">random-number</a> or <a href="/random-number?max=10">random-number?max=10</a>
    </p>
  </body>
</html>`;

// 5 - here's our 404 page
const errorPage = `	
<html>
  <head>
    <title>404 - File Not Found!</title>
  </head>
  <body>
    <h1>404 - File Not Found!</h1>
    <p>Check your URL, or your typing!!</p>
    <p>:-O</p>
  </body>
</html>`;


// 6 - this will return a random number no bigger than `max`, as a string
// we will also doing our query parameter validation here
const getRandomNumberJSON = (max=1) => {
  max = Number(max); // cast `max` to a Number
  max = !max ? 1 : max; // if `max` is not a number because it is the  "falsy"  NaN, default it to 1
  max = max < 1 ? 1 : max; // if `max` is less than 1 default it to 1
  const number = Math.random() * max;
  const responseObj = {
    timestamp: new Date(),
    number: number
  };
  return JSON.stringify(responseObj);
};


// 7 - this is the function that will be called every time a client request comes in
// this time we will look at the `pathname`, and send back the appropriate page
// note that in this course we'll be using arrow functions 100% of the time in our server-side code
const onRequest = (request, response) => {
  //console.log(request.headers);
  const parsedUrl = url.parse(request.url);
  const pathname = parsedUrl.pathname;
  console.log("parsedUrl=", parsedUrl);
  console.log("pathname=", pathname);
  
  const params = query.parse(parsedUrl.query);
  const max = params.max;
  console.log("params=", params);
  console.log("max=", max);
  
  if(pathname == "/"){
    response.writeHead(200, { 'Content-Type': 'text/html'}); // send response headers
    response.write(indexPage); // send content
    response.end(); // close connection
  }else if(pathname == "/random-number"){
    response.writeHead(200, { 'Content-Type': 'application/json'}); // send response headers
    response.write(getRandomNumberJSON(max)); // send content
    response.end(); // close connection
  }else{
    response.writeHead(404, { 'Content-Type': 'text/html'}); // send response headers
    response.write(errorPage); // send content
    response.end(); // close connection
  }
   
};


// 8 - create the server, hook up the request handling function, and start listening on `port`
http.createServer(onRequest).listen(port); // method chaining!

console.log(`Listening on 127.0.0.1: ${port}`);


