#!/bin/bash
set -eu
cd "$(dirname "${0}")" || exit

bash ./remove_app.bash

npm run build

readonly DEPLOY_DIR="./build/"
readonly BUCKET_NAME="retro-suggestion"
aws s3 cp ${DEPLOY_DIR} s3://${BUCKET_NAME} --recursive
