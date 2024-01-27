#!/bin/bash
# Cria fila SQS
awslocal sqs create-queue --endpoint-url http://localhost:4566 --queue-name novo_pedido --region us-east-1
awslocal sqs create-queue --endpoint-url http://localhost:4566 --queue-name pagamento_processado --region us-east-1
awslocal sqs create-queue --endpoint-url http://localhost:4566 --queue-name pedido_recebido --region us-east-1

## Cria tabela DynamoDB
awslocal dynamodb create-table \
    --table-name pedidos \
    --key-schema AttributeName=id,KeyType=HASH \
    --attribute-definitions AttributeName=id,AttributeType=N \
    --region us-east-1 \
    --billing-mode PAY_PER_REQUEST \
    --endpoint-url http://localhost:4566
