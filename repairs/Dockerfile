FROM openjdk:17
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} repairs.jar
ENTRYPOINT ["java","-jar","/repairs.jar"]