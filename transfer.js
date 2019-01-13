module.exports.getRate = async (event, context) => {

    var response = { 
      statusCode: 200,
      body: JSON.stringify({
        message: 'Go Serverless on Transfer function',
        input: event,
      })
    };
  
    return response;
  
    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
  };