var expect = require( 'chai' ).expect;
var LambdaTester = require( 'lambda-tester' ).noVersionCheck();
var transferApi = require( '../transfer-from-usa' ).getRate;
var transferCanadaApi = require( '../transfer-from-canada' ).getRate;

describe('transferCanadaApi', function() {
    it( 'test success', function() {
		return LambdaTester( transferCanadaApi )
			.event()
			.expectResult((result) => {
                expect( result.statusCode).to.be.equal(200);
            });
	});
});

describe('transferApi', function() {
    it( 'test success', function() {
		const inputCountries = "USD_INR";
		return LambdaTester( transferApi )
			.event()
			.expectResult((result) => {
                expect( result.statusCode).to.be.equal(200);
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