FROM openjdk:17
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} bonuses.jar
ENTRYPOINT ["java","-jar","/bonuses.jar"]