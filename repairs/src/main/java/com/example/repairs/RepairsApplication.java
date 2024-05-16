package com.example.repairs;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class RepairsApplication {

	public static void main(String[] args) {
		SpringApplication.run(RepairsApplication.class, args);
	}

}
