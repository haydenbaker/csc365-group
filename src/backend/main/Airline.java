package main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan({"resource"})
public class Airline {
    public static void main(String[] args){
        SpringApplication.run(Airline.class, args);
    }
}
