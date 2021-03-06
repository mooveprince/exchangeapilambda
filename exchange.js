var rp = require('request-promise');

var getExchangeRate = function (conversionBetween) {

  var apiKey = process.env.EXCHANGE_API_KEY ;

  var options = {
    uri: `http://free.currencyconverterapi.com/api/v3/convert?q=${conversionBetween}&compact=y&apiKey=${apiKey}`,
    json: true
  }

  return rp (options)
    .then (exchangeResult => {
        console.log ("Success response sent for currency exchange")
        let exchange = exchangeResult[conversionBetween];
        exchange.val = exchange.val.toFixed(2);
        return exchange;
        //res.json ({'status': 'success', 'exchangeRate': exchange});
    })
    .catch (err => {
      console.log (`Error in calling API ${err}`);
      return err;
      //res.json ({'status': 'failure', 'description': err});
    }); 

}

module.exports.getRate = (event, context, callback) => {

  var conversionBetween = event.queryStringParameters.rateBetween;

  var response = { 
    statusCode: 200,
    body: {
    }
  };

  if (!conversionBetween) {
    var error = "The countries for which exchange has to be calculated was not given";
    console.log (error);
    response.statusCode = 1002;
    output = {"descripiton" : error};
    
    response.body = JSON.stringify(output);
    callback (null, response);
  } else {
    var apiResult = getExchangeRate (conversionBetween);

    apiResult
      .then (data=> {
        response.statusCode = 200;
        output = { "conversionBetween":conversionBetween, "exchangeRate" : data.val };
        response.body = JSON.stringify(output);
        callback (null, response);
      })
      .catch (err => {
        console.log ("error occurred while making the call to get Exchange Rate API ")
        response.statusCode = 1001;
        output = {"descripiton" : error};
    
        response.body = JSON.stringify(output);       
        callback (null, response);
      })

  }

}