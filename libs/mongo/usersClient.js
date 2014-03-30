/**
 * ユーザー管理コレクションを操作するモジュール
 */
module.exports = {

    /**
     * 新規登録
     */
    insert: function( name, db, collectionUsers, cb_onSuccess ) {

        // idをインクリメントするために最新のユーザーを取得
        this.getLatestUser( db, collectionUsers, function( userInfo )  {

            var insertUserInfo = {
                    _id    : userInfo._id + 1,
                    name   : name,
                    iconUrl: '',
                    tweet  : '',
                    others : []
                };

            collectionUsers.insert( insertUserInfo, function( err, docs ) {

                if ( err ) {

                    db.close();
                    throw err;
                }

                cb_onSuccess( docs[0] );
            } );
        } );
    },

    /**
     * ユーザー情報取得
     */
    get: function( id, db, collectionUsers, cb_onSuccess ) {

        var targetUser = collectionUsers.find( { '_id': Number( id ) } );
        
        targetUser.toArray( function( err, docs ) {

            if ( err ) {

                db.close();
                throw err;
            }

            if ( docs.lenght === 0 ) {

                cb_onSuccess( {} );
            }
            else {

                cb_onSuccess( docs[0] );
            }
        } );
    },

    /**
     * 一番最新のユーザー情報を取得する
     */
    getLatestUser: function( db, collectionUsers, cb_onSuccess ) {

        var latest = collectionUsers.find( {} ).sort( { _id: -1 } ).limit( 1 );

        latest.toArray( function( err, docs ) {

            if ( err ) {

                db.close();
                throw err;
            }

            cb_onSuccess( docs[0] );
        } );
    }
};
