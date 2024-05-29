#!/bin/bash

cd /home/diggy/Universidad/6/Tingeso/E2/Tingeso-Evaluacion-2/config-server/
mvn clean install -DskipTests=True
docker build -t dilget/config-server .
docker push dilget/config-server

cd ..
cd eureka-server/
mvn clean install -DskipTests=True
docker build -t dilget/eureka-server .
docker push dilget/eureka-server

cd ..
cd vehicles/
mvn clean install -DskipTests=True
docker build -t dilget/vehicles:latest .
docker push dilget/vehicles:latest

cd ..
cd repairs/
mvn clean install -DskipTests=True
docker build -t dilget/repairs:latest .
docker push dilget/repairs:latest

cd ..
cd repairs-list/
mvn clean install -DskipTests=True
docker build -t dilget/repairs-list:latest .
docker push dilget/repairs-list:latest

cd ..
cd reports/
mvn clean install -DskipTests=True
docker build -t dilget/reports:latest .
docker push dilget/reports:latest

cd ..
cd bonuses/
mvn clean install -DskipTests=True
docker build -t dilget/bonuses:latest .
docker push dilget/bonuses:latest

cd ..
cd gateway-server/
mvn clean install -DskipTests=True
docker build -t dilget/gateway-server .
docker push dilget/gateway-server