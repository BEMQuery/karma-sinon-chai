const path = require( 'path' );

function pattern( file ) {
	return {
		pattern: file,
		included: true,
		served: true,
		watched: false
	};
}

function endsWith( substr ) {
	return function( str ) {
		return str.indexOf( substr ) >= 0 && str.indexOf( substr ) === ( str.length - substr.length );
	};
}

function _isDuplicate( files, file ) {
	let result = false;

	for ( let i = 0; i < files.length; i++ ) {
		if ( files[ i ] ) {
			const pattern = files[ i ].pattern;

			result = result || endsWith( path.relative( __dirname, file ) )( pattern );
		}
	}

	return result;
}

function framework( files ) {
	const isDuplicate = _isDuplicate.bind( this, files );

	/* Lolex */
	const lolexPath = `${ path.dirname( require.resolve( 'lolex/package.json' ) ) }/lolex.js`;

	/* Sinon */
	const sinonPath = `${ path.dirname( require.resolve( 'sinon/package.json' ) ) }/pkg/sinon.js`;

	if ( !isDuplicate( sinonPath ) ) {
		files.unshift( pattern( lolexPath ) );
		files.unshift( pattern( sinonPath ) );
	}

	/* Chai */
	const chaiPath = `${ path.dirname( require.resolve( 'chai/package.json' ) ) }/chai.js`;

	if ( !isDuplicate( chaiPath ) ) {
		files.unshift( pattern( chaiPath ) );
		files.push( pattern( path.join( __dirname, '../adapters/chai.js' ) ) );
	}

	/* Sinon-Chai */
	const sinonChaiPath = path.resolve( require.resolve( 'sinon-chai' ) );

	if ( !isDuplicate( sinonChaiPath ) ) {
		files.push( pattern( sinonChaiPath ) );
	}
}

framework.$inject = [ 'config.files' ];

module.exports = {
	'framework:sinon-chai': [
		'factory',
		framework
	]
};
