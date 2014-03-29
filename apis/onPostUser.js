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

            res.send( 500, { error: message } );
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

            database = 'mongodb://127.0.0.1:27017/GeoFriend';

            mongoClient.connect( database, function( err, db ) {

                if ( err ) {

                    error( 500 );
                    return ;
                }

                var users = db.collection( 'users' );

                users.count( function( err, count ) {

                    if ( err ) {

                        db.close();
                        error( 500 );
                        return ;
                    }

                    var userinfo = {
                            _id    : count + 1,
                            name   : req.body.name,
                            iconUrl: '',
                            tweet  : '',
                            others : []
                        };

                    users.insert( userinfo, function( err, docs ) {

                        if ( err ) {

                            db.close();
                            error( 500 );
                            return ;
                        }

                        var latest = users.find( {} ).sort( {_id: -1} ).limit( 1 );

                        latest.toArray( function( err, docs ) {

                            success( docs[0]._id );
                        } );
                    } );
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
            set();

            // responseを表示
        };

    main();
};


