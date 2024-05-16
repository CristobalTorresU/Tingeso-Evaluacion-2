package com.example.repairslist;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class RepairsListApplication {

	public static void main(String[] args) {
		SpringApplication.run(RepairsListApplication.class, args);
	}

}
