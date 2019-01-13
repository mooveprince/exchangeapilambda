var request = require('request');

module.exports.getRate = (event, context, callback) => {
  console.log ("Request for Exchange Rate" + JSON.stringify(event));

  var requestObj = {
  }

  var response = { 
  };

  var conversionBetween = event.rateBetween;

  if (!conversionBetween) {
    var error = "The countries for which exchange has to be calculated was not given";
    console.log (error);
    response.statusCode = 1002;
    response.descripiton = error;
    callback (null, response);
  } else {
    requestObj.url = `http://free.currencyconverterapi.com/api/v3/convert?q=${conversionBetween}&compact=y`;
    request (requestObj, function (error, res, body) {
      if (error) {
        console.log ("error occurred while making the call to get Exchange Rate API ")
        response.statusCode = 1001;
        response.descripiton = error;
        callback (null, response);      
      } else if (res.statusCode == 200 ) {
        console.log ("Exchange Value has been retrived" );
        response.statusCode = 200;
        var valueFromApiInJson = JSON.parse(body);
        var toBeFormatted =  valueFromApiInJson[conversionBetween];
        response.exchangeRate = toBeFormatted.val.toFixed(2);
        callback (null, response);
      }
    });
  }
  
};
