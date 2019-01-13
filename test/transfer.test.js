var expect = require( 'chai' ).expect;
var LambdaTester = require( 'lambda-tester' ).noVersionCheck();
var transferApi = require( '../transfer' ).getRate;

describe('transferApi', function() {
    it( 'test success', function() {
		const inputCountries = "USD_INR";
		return LambdaTester( transferApi )
			.event()
			.expectResult((result) => {
                expect( result.statusCode).to.be.equal(200);
                expect( result.body.exchangeRateList).to.exist;
            });
	});

	/*it ('test failure', function() {
		const inputCountries = null;
		return LambdaTester( transferApi )
			.event({"rateBetween":inputCountries})
			.expectResult((result ) => {
				expect(result.statusCode).to.be.equal(1002);
                expect( result.descripiton.length).to.be.above(0);

            });		
	})*/

});