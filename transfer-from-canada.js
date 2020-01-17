var rp = require('request-promise');
var cheerio = require('cheerio');

var cadInrTransferDetails = function () {
    var options = {
        uri: 'https://remitrate.com/best-exchange-rates/compare-CAD-to-INR?filter=hidespecial',
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    return rp(options)
    .then(function ($) {
        var transferDetails = [];

        

        return transferDetails.sort((a, b) => b.exchangeRate - a.exchangeRate);
    })
    .catch(function (err) {
    // Crawling failed or Cheerio choked... 
    });
}


module.exports.getRate =  (event, context, callback) => {

    var apiResult = cadInrTransferDetails ();
  
    var response = { 
      statusCode: 200,
      body: {
      }
    };
  
    apiResult.then(data => {
      response.statusCode = 200;
      output = { "transfer between": "CAD to INR", "exchangeRateList" : data };
      response.body = JSON.stringify(output);
      callback (null, response);
    });
  
  };