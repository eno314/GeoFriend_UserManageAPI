var express = require( 'express' ),
    app     = express(),
    
    port = 60080;

/**
 * リクエストbodyをパースするためのモジュールセット
 */
app.use( express.bodyParser() );

/**
 * ユーザー情報取得API
 */
app.get( '/user/:id', function( req, res ) {

    console.log( req.params );
    console.log( '%s %s', req.method, req.url );
} );

/**
 * ユーザー登録API
 */
app.post( '/user', function( req, res ) {

    console.log( req.body );
    console.log( '%s %s', req.method, req.url );
} );

/**
 * ユーザー情報更新API
 */
app.put( '/user/:id', function( req, res ) {

    console.log( req.params );
    console.log( req.body );
    console.log( '%s %s', req.method, req.url );
} );

app.listen( port );
