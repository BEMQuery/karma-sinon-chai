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

function isDuplicate( files, file ) {
	let result = false;

	for ( let i = 0; i < files.length; i++ ) {
		if ( files[ i ] ) {
			const pattern = files[ i ].pattern;

			result = result || endsWith( path.relative( __dirname, file ) )( pattern );
		}
	}

	return result;
}

export { pattern };
export { endsWith };
export { isDuplicate };
