# @bemquery/karma-sinon-chai

[![npm version](https://badge.fury.io/js/%40bemquery%2Fkarma-sinon-chai.svg)](https://badge.fury.io/js/%40bemquery%2Fkarma-sinon-chai) [![Dependency status](https://david-dm.org/BEMQuery/karma-sinon-chai.png)](https://david-dm.org/BEMQuery/karma-sinon-chai) [![devDependency Status](https://david-dm.org/BEMQuery/karma-sinon-chai/dev-status.png)](https://david-dm.org/BEMQuery/karma-sinon-chai?type=dev)

[Sinon](http://sinonjs.org/) + [Chai](http://chaijs.com) + [Sinon-Chai](https://github.com/domenic/sinon-chai) for [Karma](http://karma-runner.github.io)

## Requirements

This Karma plugin requires Karma `>=0.10`

##Installation

Install the module via npm

```bash
$ npm install [--save-dev] @bemquery/karma-sinon-chai
```

Add `sinon-chai` to the `frameworks` key in your Karma configuration:

```javascript
module.exports = function(config) {
	'use strict';
	config.set({
		frameworks: ['mocha', 'sinon-chai'],

		# chai config
		client: {
			chai: {
				includeStack: true
			}
		}

		#...
	});
}
```

## Usage

Each of the different Chai assertion suites is available in the tests:

```javascript
describe( 'karma tests with chai', () =>
{
	it( 'should expose the Chai assert method', () => {
		assert.ok( 'everything', 'everything is ok' );
	} );

	it( 'should expose the Chai expect method', () => {
		expect( 'foo' ).to.not.equal( 'bar' );
	} );

	it( 'should expose the Chai should property', () => {
		1..should.not.equal( 2 );
		should.exist( 123 );
	} );
} );
```

Sinon and Chai matchers for Sinon are also available:

```javascript
describe( 'karma tests with sinon', () => {
	it( 'can spy on objects', ()=> {
		var foo =  {
			bar: () => {}
		};

		sinon.spy( foo, 'bar' );

		foo.bar( 'baz' );

		foo.bar.should.have.been.calledWith( 'baz' );
	} );
} );
```
