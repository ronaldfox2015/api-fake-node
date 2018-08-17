
// Cargar modulos y crear nueva aplicacion
var express = require("express");
var fs = require('fs');

var app = express();
var bodyParser = require('body-parser');
// Route that triggers a sample error:

app.use(bodyParser.json()); // soporte para bodies codificados en jsonsupport
app.use(bodyParser.urlencoded({ extended: true })); // soporte para bodies codificados

function handerError(res) {
  res.status(404);
  res.json({
    "error": "Error. Route not found"
  })
  return res
}

//Ejemplo: GET http://localhost:8081/v1/payment/products?product_type=:product_type
app.get('/v1/payment/products/', function (req, res) {
  fs.readFile('mocks/payment.json', function (err, data) {
    response = JSON.parse(data)
    result = response.payment.product.get.query[req.query.product_type];

    if (typeof result == 'undefined') {
      return handerError(res)
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(result));
    res.end();
  });

});
//Ejemplo: GET http://localhost:8081/v1/payment/products/:id
app.get('/v1/payment/products/:id', function (req, res) {
  fs.readFile('mocks/payment.json', function (err, data) {
    response = JSON.parse(data)
    result = response.payment.product.get.params[req.params.id];

    if (typeof result == 'undefined') {
      return handerError(res)
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(result));
    res.end();
  });
});

//Ejemplo: GET http://localhost:8081/v1/payment/companies/:company_id/product/:product_id
app.get('/v1/payment/companies/:company_id/product/:product_id', function (req, res, next) {
  fs.readFile('mocks/payment.json', function (err, data) {
    response = JSON.parse(data)
    result = response.payment.companies[req.params.company_id].product[req.params.product_id]

    if (typeof result == 'undefined') {
      return handerError(res)
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    response = JSON.parse(data)
    res.write(JSON.stringify(result));
    res.end();
  });
});

//Ejemplo: GET http://localhost:8081/v1/payment/companies/:company_id/product/:product_id
app.get('/v1/payment/companies/:company_id/product/:product_id', function (req, res, next) {
  fs.readFile('mocks/payment.json', function (err, data) {
    res.writeHead(200, { 'Content-Type': 'application/json' });

    response = JSON.parse(data)
    result = response.payment.companies[req.params.company_id].product[req.params.product_id]

    if (typeof result == 'undefined') {
      return handerError(res)
    }

    res.write(JSON.stringify(result))
    res.end();
  });
});

//Ejemplo: DELETE http://localhost:8081/v1/payment/companies/$companyId/product/$productId/decrement
app.put('/v1payment/companies/:company_id/product/:product_id/decrement', function (req, res, next) {
  fs.readFile('mocks/payment.json', function (err, data) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    response = JSON.parse(data)
    res.write(JSON.stringify(response.payment.companies[req.params.company_id].product[req.params.product_id]));
    res.end();
  });
});



var server = app.listen(8081, function () {
  app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  console.log('Server is running..');
});