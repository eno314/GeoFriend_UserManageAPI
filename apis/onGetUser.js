var connectHelper = require( '../libs/mongo/connectHelper' ),
    usersClient   = require( '../libs/mongo/usersClient' );

/**
 * ユーザー参照API
 * @param req expressのRequest
 * @param res expressのResponse
 */
module.exports = function( req, res ) {

    var success = function( userInfo) {

            res.send( 200, userInfo );
        },
        
        error = function( code ) {

            var message = 'Internal Server Error.';

            switch( code ) {
                case 400:
                    message = 'Bad request.';
                    break;
                case 403:
                    message = 'Forbidden.';
                    break;
            }

            res.send( code, { error: message } );
        },
        
        validate = function() {

            if ( req.params.id === undefined || req.params.id === '' ) {

                return false;
            }

            if ( req.query.appid === undefined || req.query.appid === '' ) {
                // とりあえずappidは空じゃなきゃOK
                return false;
            }

            return true;
        },

        get = function() {

            connectHelper( function( db ) {

                var users = db.collection( 'users' );

                usersClient.get( req.params.id, db, users, function( userInfo ) {

                    success( userInfo );
                } );
            } );
        },
        
        main = function() {

            console.log( req.params.id );
            console.log( req.query );
            console.log( '%s %s', req.method, req.url );

            // バリデーション
            if ( validate() === false ) {

                error( 400 );
                return ;
            }

            // dbから取得
            get();
        };

    main();

    process.on('uncaughtException', function ( err ) {

        console.error( err );
        error( 500 );
    } );
};
