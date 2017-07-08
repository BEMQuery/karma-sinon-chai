import { dirname } from 'path';
import { join } from 'path';
import { resolve } from 'path';
import { pattern } from './utils.js';
import { endsWith } from './utils.js';
import { isDuplicate } from './utils.js';

function framework( files ) {
	const checkDuplicate = isDuplicate.bind( this, files );

	/* Lolex */
	const lolexPath = `${ dirname( require.resolve( 'lolex/package.json' ) ) }/lolex.js`;

	/* Sinon */
	const sinonPath = `${ dirname( require.resolve( 'sinon/package.json' ) ) }/pkg/sinon.js`;

	if ( !checkDuplicate( sinonPath ) ) {
		files.unshift( pattern( lolexPath ) );
		files.unshift( pattern( sinonPath ) );
	}

	/* Chai */
	const chaiPath = `${ dirname( require.resolve( 'chai/package.json' ) ) }/chai.js`;

	if ( !checkDuplicate( chaiPath ) ) {
		files.unshift( pattern( chaiPath ) );
		files.push( pattern( join( __dirname, '../adapters/chai.js' ) ) );
	}

	/* Sinon-Chai */
	const sinonChaiPath = resolve( require.resolve( 'sinon-chai' ) );

	if ( !checkDuplicate( sinonChaiPath ) ) {
		files.push( pattern( sinonChaiPath ) );
	}
}

framework.$inject = [ 'config.files' ];

export default {
	'framework:sinon-chai': [
		'factory',
		framework
	]
};
