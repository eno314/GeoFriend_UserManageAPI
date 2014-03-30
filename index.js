var express = require( 'express' ),
    app     = express(),

    onGetUser  = require( './apis/onGetUser' ),
    onPostUser = require( './apis/onPostUser' ),
    onPutUser  = require( './apis/onPutUser' ),
    
    port = 60080;

// bodyのパース用モジュール
app.use( express.bodyParser() );

/**
 * ユーザー情報参照API
 */
app.get( '/user/:id', onGetUser );

/**
 * ユーザー登録API
 */
app.post( '/user', onPostUser );

/**
 * ユーザー情報更新API
 */
app.put( '/user/:id', onPutUser );

app.listen( port );
