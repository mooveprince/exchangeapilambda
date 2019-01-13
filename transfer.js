var rp = require('request-promise');
var cheerio = require('cheerio');

var usdInrTransferDetails = function () {
  var options = {
      uri: 'http://entryindia.com/exchange_rates',
      transform: function (body) {
          return cheerio.load(body);
      }
  };
  return rp(options)
      .then(function ($) {
          var transferDetails = [];
          $('#ei_bxr_table').children().each(function (i, ele) {
              if (ele) {
                  var exchangeRate = $(this).children().first().next().text().trim().substring(0,5);
                  var agencyName = $(this).find('a').last().attr('href').replace("/exchange_rates/","");
                  transferDetails.push ({exchangeRate: exchangeRate, agencyName: agencyName});
              }   
          });
          return transferDetails.sort((a, b) => b.exchangeRate - a.exchangeRate);
  })
      .catch(function (err) {
      // Crawling failed or Cheerio choked... 
  });
}

module.exports.getRate =  (event, context, callback) => {

  var apiResult = usdInrTransferDetails ();

  var response = { 
    statusCode: 200,
    body: {
    }
  };

  apiResult.then(data => {
    response.statusCode = 200;
    response.body.exchangeRateList = data;
    callback (null, response);
  });

};

