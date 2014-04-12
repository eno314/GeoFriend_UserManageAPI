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

            var userid = 1;

            if ( userInfo != undefined ) {

                userid = userInfo._id + 1;
            }

            // 初回登録は名前しか入力しない
            var insertUserInfo = {
                    _id    : userid,
                    name   : name,
                    iconUrl: '',
                    tweet  : '',
                    tags : []
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

            console.log( 'success get !!!! result ->' );
            console.log( docs );

            if ( docs.lenght === 0 ) {

                cb_onSuccess();
            }
            else {

                cb_onSuccess( docs[0] );
            }
        } );
    },

    /**
     * 対象idのユーザー情報を更新する
     */
    update: function( id, key, value, db, collectionUsers, cb_onUpdated ) {

        // 更新対象ユーザーがいるか確認
        this.get( id, db, collectionUsers, function( userInfo ) {

            // ユーザーが見つからなかった
            if ( userInfo === undefined ) {

                db.close();
                cb_onUpdated( false );
                return ;
            }

            var target  = { '_id': Number( id ) },
                setInfo = {};

            if      ( key === 'name'    ) { setInfo = { 'name'   : value }; }
            else if ( key === 'iconUrl' ) { setInfo = { 'iconUrl': value }; }
            else if ( key === 'tweet'   ) { setInfo = { 'tweet'  : value }; }
            else if ( key === 'tags' ) {

                if ( value === '' ) { setInfo = { 'tags': [] }; }
                else                { setInfo = { 'tags': value.split( ',' ) }; }
            }
            else {
                cb_onUpdated( false );
                return ;
            }

            collectionUsers.update( target, { $set: setInfo }, function( err ) {

                if ( err ) {

                    db.close();
                    throw err;
                }

                cb_onUpdated( true );
            } );
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

            console.log( 'success get latest user !!!! result ->' );
            console.log( docs );

            if ( docs.lenght === 0 ) {

                cb_onSuccess();
            }
            else {

                cb_onSuccess( docs[0] );
            }
        } );
    }
};
