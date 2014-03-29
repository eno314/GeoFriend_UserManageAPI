var mongoClient = require( 'mongodb' ).MongoClient;

/**
 *
 */
module.exports = function( host, port, dbname, cb_onConnected, cb_onError ) {

    var database = 'mongodb://' + host + ':' + port + '/' + dbname;

    mongoClient.connect( database, function( err, db ) {

         if ( err ) {

            cb_onError( err );
        }

        cb_onConnected( db );
    } );
};

