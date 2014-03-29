var express = require( 'express' ),
    app     = express(),
    
    port = 60080;

/**
 * $B%j%/%(%9%H(Bbody$B$r%Q!<%9$9$k$?$a$N%b%8%e!<%k%;%C%H(B
 */
app.use( express.bodyParser() );

/**
 * $B%f!<%6!<>pJs<hF@(BAPI
 */
app.get( '/user/:id', function( req, res ) {

    console.log( req.params );
    console.log( '%s %s', req.method, req.url );
} );

/**
 * $B%f!<%6!<EPO?(BAPI
 */
app.post( '/user', function( req, res ) {

    console.log( req.body );
    console.log( '%s %s', req.method, req.url );
} );

/**
 * $B%f!<%6!<>pJs99?7(BAPI
 */
app.put( '/user/:id', function( req, res ) {

    console.log( req.params );
    console.log( req.body );
    console.log( '%s %s', req.method, req.url );
} );

app.listen( port );
