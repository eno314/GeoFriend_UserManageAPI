var mongoClient = require( 'mongodb' ).MongoClient;

/**
 * GeoFriend用のmongo接続モジュール
 */
module.exports = function( cb_onConnected ) {

    var database = 'mongodb://127.0.0.1:27017/GeoFriend';

    mongoClient.connect( database, function( err, db ) {

        if ( err ) {
            
            throw err;
        }

        cb_onConnected( db );
    } );
};

