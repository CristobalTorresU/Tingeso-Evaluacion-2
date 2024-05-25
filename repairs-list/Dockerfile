FROM openjdk:17
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} repairs-list.jar
ENTRYPOINT ["java","-jar","/repairs-list.jar"]