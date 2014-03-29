
/**
 * ユーザー登録API
 * @param req expressのRequest
 * @param res expressのResponse
 */
module.exports = function( req, res ) {

    console.log( req.body );
    console.log( '%s %s', req.method, req.url );
};
