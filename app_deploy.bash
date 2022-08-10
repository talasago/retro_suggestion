#!/bin/sh -eu
cd "$(dirname "${0}")" || exit

npm run build

readonly DEPLOY_DIR="./build/"
readonly BUCKET_NAME="retro-suggestion"
aws s3 cp ${DEPLOY_DIR} s3://${BUCKET_NAME} --recursive
