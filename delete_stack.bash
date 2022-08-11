#!/bin/bash
set -eu

cd "$(dirname "${0}")" || exit

readonly STACK_NAME="retro-suggestion"
aws cloudformation delete-stack \
    --stack-name ${STACK_NAME} \

aws cloudformation wait stack-delete-complete \
    --stack-name ${STACK_NAME}
