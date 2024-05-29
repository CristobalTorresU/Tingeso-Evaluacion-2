#!/bin/bash

cd /home/diggy/Universidad/6/Tingeso/E2/Tingeso-Evaluacion-2/deployment/
kubectl delete services --all
kubectl delete pods --all
kubectl delete deployments --all

kubectl apply -f postgres-config-map.yaml
kubectl apply -f postgres-secrets.yaml
kubectl apply -f vehicles-db-deployment-service.yaml
kubectl apply -f repairs-db-deployment-service.yaml
kubectl apply -f repairs-list-db-deployment-service.yaml
kubectl apply -f reports-db-deployment-service.yaml
kubectl apply -f bonuses-db-deployment-service.yaml
kubectl apply -f config-server-deployment-service.yaml
kubectl apply -f eureka-server-deployment-service.yaml
kubectl apply -f gateway-server-deployment-service.yaml

#kubectl apply -f vehicles-deployment-service.yaml
#kubectl apply -f repairs-deployment-service.yaml
#kubectl apply -f repairs-list-deployment-service.yaml
#kubectl apply -f reports-deployment-service.yaml
#kubectl apply -f bonuses-deployment-service.yaml