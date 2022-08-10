#!/bin/sh -eu
cd "$(dirname "${0}")" || exit

readonly BUCKET_NAME="retro-suggestion"
aws s3 rm s3://${BUCKET_NAME} --recursive
