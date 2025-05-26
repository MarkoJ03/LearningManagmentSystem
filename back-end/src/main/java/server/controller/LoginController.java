package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.annotation.security.PermitAll;
import server.DTOs.UserLoginDTO;
import server.model.Korisnik;
import server.service.KorisnikService;
import server.utils.TokenUtils;

@Controller
@RequestMapping("/api/login")
@PermitAll
public class LoginController {
	@Autowired
	private TokenUtils tokenUtils;
	
	@Autowired
	private UserDetailsService userDetailsService;
	
	@Autowired
	private KorisnikService korisnikService;
	
	@PostMapping("login")
	public ResponseEntity<String> login(@RequestBody UserLoginDTO user) {
		Korisnik korisnik = korisnikService.findByEmailAndPassword(user.getUsername(), user.getPassword());
		
		if(korisnik !=null) {
			UserDetails userDetails = userDetailsService.loadUserByUsername(korisnik.getEmail());
			return new ResponseEntity<String>(tokenUtils.generateToken(userDetails), HttpStatus.OK);
		}
		
		return new ResponseEntity<String>(HttpStatus.UNAUTHORIZED);
	}
}
