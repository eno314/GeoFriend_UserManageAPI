var connectHelper = require( '../libs/mongo/connectHelper.js' ),
    usersClient   = require( '../libs/mongo/usersClient.js' );

/**
 * ユーザー登録API
 * @param req expressのRequest
 * @param res expressのResponse
 */
module.exports = function( req, res ) {

    var mongoClient = require( 'mongodb' ).MongoClient,

        success = function( userid ) {

            res.send( 200, { _id: userid } );
        }
        
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

            if ( req.body.name === undefined || req.body.name === '' ) {

                return false;
            }

            if ( req.body.appid === undefined || req.body.appid === '' ) {
                // とりあえずappidは空じゃなきゃOK
                return false;
            }

            return true;
        },

        set = function() {

            connectHelper( function( db ) {

                var users = db.collection( 'users' );

                usersClient.insert( req.body.name, db, users, function( userInfo ) {

                    success( userInfo._id );
                } );
            } );
        },
        
        main = function() {

            console.log( req.body );
            console.log( '%s %s', req.method, req.url );

            // バリデーション
            if ( validate( req.body ) === false ) {

                error( 400 );
                return ;
            }

            // dbに登録
            try {

                set();

            } catch( e ) {

                console.log( e );
                error( 500 )
                return ;
            }
        };

    main();

    process.on('uncaughtException', function ( err ) {

        console.error( err );
        error( 500 );
    });
};
