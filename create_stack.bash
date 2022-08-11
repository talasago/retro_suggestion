#!/bin/bash
set -eu
cd "$(dirname "${0}")" || exit

readonly STACK_NAME="retro-suggestion"
aws cloudformation create-stack \
    --stack-name ${STACK_NAME} \
    --template-body file://./infra/s3.yml

aws cloudformation wait stack-create-complete \
    --stack-name ${STACK_NAME}
