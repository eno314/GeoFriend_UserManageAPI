mongoDBで管理

データベース名：GeoFriend

コレクション名：users

# ユーザー情報のデータ項目

必須項目

<table>
  <tr>
    <th>物理名</th>
    <th>論理名</th>
    <th>型</th>
    <th>必須かどうか</th>
    <th>備考</th>
  <tr>
  <tr>
    <td>_id</td>
    <td>ユーザーid</td>
    <td>int</td>
    <td>◯</td>
    <td>auto increment</td>
  </tr>
  <tr>
    <td>name</td>
    <td>ユーザー名</td>
    <td>String</td>
    <td>◯</td>
    <td></td>
  </tr>
  <tr>
    <td>iconUrl</td>
    <td>アイコンのurl</td>
    <td>String</td>
    <td>◯</td>
    <td>デフォルト値は空文字</td>
  </tr>
  <tr>
    <td>tweet</td>
    <td>一言メッセージ</td>
    <td>String</td>
    <td>◯</td>
    <td>デフォルト値は空文字</td>
  </tr>
</table>

---

自由に入力できるタグ

<table>
  <tr>
    <th>物理名</th>
    <th>論理名</th>
    <th>型</th>
    <th>備考</th>
  <tr>
  <tr>
    <td>tag</td>
    <td>タグ名</td>
    <td>String</td>
    <td></td>
  </tr>
  <tr>
    <td>value</td>
    <td>値</td>
    <td>String</td>
    <td></td>
  </tr>
</table>

# jsonでのイメージ

```
{
    '_id'    : 1,
    'name'   : 'hgoehoge',
    'iconUrl': 'fugafuga',
    'tweet'  : 'piyopiyo',
    'others' : [
        {
            'tag'  : '好きなゲーム',
            'value': 'アイマス'
        },
        {
            'tag'  : '好きな食べ物',
            'value': 'らあめん'
        }
    ]
}
```

# 登録API

<table>
  <tr>
    <th>エントリポイント</th>
    <th>メソッド</th>
  <tr>
  <tr>
    <td>/user/</td>
    <td>POST</td>
  </tr>
</table>

## リクエストパラメータ

<table>
  <tr>
    <th>パラメータ名</th>
    <th>型名</th>
    <th>必須かどうか</th>
    <th>備考</th>
  <tr>
  <tr>
    <td>appid</td>
    <td>String</td>
    <td>◯</td>
    <td></td>
  </tr>
  <tr>
    <td>name</td>
    <td>String</td>
    <td>◯</td>
    <td></td>
  </tr>
</table>

## レスポンスフィールド

<table>
  <tr>
    <th>フィールド</th>
    <th>型名</th>
    <th>必須かどうか</th>
    <th>備考</th>
  <tr>
  <tr>
    <td>/_id</td>
    <td>String</td>
    <td>◯</td>
    <td>失敗時は-1が入る</td>
  </tr>
</table>

サンプルjson
```
{
    '_id'    : 1
}
```

# 参照API

<table>
  <tr>
    <th>エントリポイント</th>
    <th>メソッド</th>
  <tr>
  <tr>
    <td>/user/[id]/</td>
    <td>GET</td>
  </tr>
</table>

## リクエストパラメータ

<table>
  <tr>
    <th>パラメータ名</th>
    <th>型名</th>
    <th>必須かどうか</th>
    <th>備考</th>
  <tr>
  <tr>
    <td>appid</td>
    <td>String</td>
    <td>◯</td>
    <td></td>
  </tr>
</table>

## レスポンスフィールド

サンプルjson
```
{
    '_id'    : 1,
    'name'   : 'hgoehoge',
    'iconUrl': '',
    'tweet'  : '',
    'others' : [
        {
            'tag'  : '好きなゲーム',
            'value': 'アイマス'
        },
        {
            'tag'  : '好きな食べ物',
            'value': 'らあめん'
        }
    ]
}
```

値が無い場所も空で入る

# 更新API

<table>
  <tr>
    <th>エントリポイント</th>
    <th>メソッド</th>
  <tr>
  <tr>
    <td>/user/[id]/</td>
    <td>PUT</td>
  </tr>
</table>

## リクエストパラメータ

<table>
  <tr>
    <th>パラメータ名</th>
    <th>型名</th>
    <th>必須かどうか</th>
    <th>備考</th>
  <tr>
  <tr>
    <td>appid</td>
    <td>String</td>
    <td>◯</td>
    <td></td>
  </tr>
  <tr>
    <td>tag</td>
    <td>String</td>
    <td>◯</td>
    <td></td>
  </tr>
  <tr>
    <td>value</td>
    <td>String</td>
    <td>◯</td>
    <td></td>
  </tr>
</table>

## レスポンスフィールド

<table>
  <tr>
    <th>フィールド</th>
    <th>型名</th>
    <th>必須かどうか</th>
    <th>備考</th>
  <tr>
  <tr>
    <td>/result</td>
    <td>String</td>
    <td>◯</td>
    <td>成功時：success 失敗時：failed</td>
  </tr>
</table>

サンプルjson
```
{
    'result' : success
}
```
