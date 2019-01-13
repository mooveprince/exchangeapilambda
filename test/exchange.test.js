var expect = require( 'chai' ).expect;
var LambdaTester = require( 'lambda-tester' ).noVersionCheck();
var exchangeApi = require( '../exchange' ).getRate;

describe('exchangeApi', function() {
    it( 'test success', function() {
		const inputCountries = "USD_INR";
		return LambdaTester( exchangeApi )
			.event({"rateBetween":inputCountries})
			.expectResult((result) => {
                expect( result.exchangeRate).to.exist;
            });
	});

	it ('test failure', function() {
		const inputCountries = null;
		return LambdaTester( exchangeApi )
			.event({"rateBetween":inputCountries})
			.expectResult((result ) => {
				console.log (result);
				expect(result.statusCode).to.be.equal(1002);
                //expect( result.body.length).to.be.above(0);

            });		
	})

});