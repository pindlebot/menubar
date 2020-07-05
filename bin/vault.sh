#!/usr/bin/bash

mkdir -p ~/.aws
touch ~/.aws/credentials

curl -d '{ "ttl": "600s" }' \
  -H "X-Vault-Token: $VAULT_TOKEN" \
  https://vault.k8s.menubar.io/v1/aws/creds/apex-up \
  | jq -r '.data | "[default]\naws_access_key_id = \(.access_key)\naws_secret_access_key = \(.secret_key)"' > ~/.aws/credentials

VAULT_DATA=$(curl -H "X-Vault-Token: $VAULT_TOKEN" https://vault.k8s.menubar.io/v1/kv/data/menubar | jq -r '.data.data')

echo "$VAULT_DATA" | jq -r 'keys[] as $k | "\($k)=\(.[$k])"' > .env