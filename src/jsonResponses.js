

// 6 - this will return a random number no bigger than `max`, as a string
// we will also doing our query parameter validation here
const getRandomNumberJSON = (max = 1) => {
  let max2 = Number(max); // cast `max` to a Number
  max2 = !max2 ? 1 : max2;
  max2 = max2 < 1 ? 1 : max2; // if `max` is less than 1 default it to 1
  const number = Math.random() * max2;
  const responseObj = {
    timestamp: new Date(),
    number,
  };
  return JSON.stringify(responseObj);
};

const getRandomNumberResponse = (request,response,params) => {
    response.writeHead(200, { 'Content-Type': 'application/json' }); // send response headers
    response.write(getRandomNumberJSON(params.max)); // send content
    response.end(); // close connection
};

module.exports.getRandomNumberResponse = getRandomNumberResponse;