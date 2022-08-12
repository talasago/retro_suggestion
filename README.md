# このリポジトリは何か
[ふりかえり手法抽選](http://retro-suggestion.s3-website-ap-northeast-1.amazonaws.com/)のコードを管理している

# ローカル起動方法
`$ npm start`を実行すると[http://localhost:3000](http://localhost:3000)で確認できる


# インフラ操作
## 前提事項
`$ export AWS_PROFILE=[profile_name]`

## CFnスタック作成
`$ bash create_stack.bash`
## アプリケーションデプロイ
`$ bash deploy_app.bash`

## アプリケーション削除
`$ bash remove_app.bash`

## CFnスタック削除
`$ bash delete_stack.bash`
