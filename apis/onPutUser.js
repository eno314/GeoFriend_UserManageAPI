var connectHelper = require( '../libs/mongo/connectHelper' ),
    usersClient   = require( '../libs/mongo/usersClient' );

/**
 * ユーザー登録API
 * @param req expressのRequest
 * @param res expressのResponse
 */
module.exports = function( req, res ) {

    var success = function( result ) {

            var message = 'success'

            if ( result === false ) {

                message = 'failed'
            }

            res.send( 200, { 'result': message } );
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

            if ( req.params.id  === undefined || req.params.id  === '' ) { return false; }
            if ( req.body.tag   === undefined || req.body.tag   === '' ) { return false; }
            if ( req.body.value === undefined || req.body.value === '' ) { return false; }
            if ( req.body.appid === undefined || req.body.appid === '' ) { return false; }

            return true;
        },

        update = function() {

            connectHelper( function( db ) {

                var users = db.collection( 'users' ),
                    id    = req.params.id,
                    tag   = req.body.tag,
                    value = req.body.value;

                usersClient.update( id, tag, value, db, users, function( result ) {

                    success( result );
                } );
            } );
        },
        
        main = function() {

            console.log( req.body );
            console.log( req.params.id );
            console.log( '%s %s', req.method, req.url );

            // バリデーション
            if ( validate( req.body ) === false ) {

                error( 400 );
                return ;
            }

            // dbに登録
            update();
        };

    main();

    process.on( 'uncaughtException', function ( err ) {

        console.error( err );
        error( 500 );
    } );
};
