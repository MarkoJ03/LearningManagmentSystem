package server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class App {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
//	    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
//	    String hashed = encoder.encode("admin");
//	    System.out.println(hashed);
		SpringApplication.run(App.class, args);

	}

}
