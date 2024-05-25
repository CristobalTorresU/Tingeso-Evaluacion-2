FROM openjdk:17
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} reports.jar
ENTRYPOINT ["java","-jar","/reports.jar"]