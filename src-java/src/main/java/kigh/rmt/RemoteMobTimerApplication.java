package kigh.rmt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@SpringBootApplication
@RestController
@EnableScheduling
public class RemoteMobTimerApplication {

	public static void main(String[] args) {

		SpringApplication.run(RemoteMobTimerApplication.class, args);
	}

	@GetMapping("/hello")
	public String hello() {

		return "Hello world";
	}
}