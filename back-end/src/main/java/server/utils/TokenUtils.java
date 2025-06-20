package server.utils;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class TokenUtils {
	
	public Key getKey() {
		return Keys.hmacShaKeyFor("aaadasoihgprpe234908arjty67j8tyjiugburepwhuregup".getBytes());
	}
	
	public Claims getClaims(String token) {
		Claims claims = null;
		try {
			claims = (Claims) Jwts.parser().setSigningKey(this.getKey()).build().parseClaimsJws(token).getBody();			
		} catch (Exception e) {
			System.out.println("Greska pri dobavljanju calims!");
		}
		return claims;
	}
	
	public boolean isExpired(String token) {
		return this.getClaims(token).getExpiration().before(new Date(System.currentTimeMillis()));
	}
	
	public boolean validateToken(String token) {
		boolean valid = true;
		
		if(this.getClaims(token) == null) {
			valid = false;
		}
		if(valid && this.isExpired(token)) {
			valid = false;
		}
		return valid;
	}
	
	public String getUsername(String token) {
		return this.getClaims(token).getSubject();
	}
	
	public String generateToken(UserDetails userDetails) {
		HashMap<String, Object> payload = new HashMap<String, Object>();
		payload.put("sub", userDetails.getUsername());
		payload.put("authorities", userDetails.getAuthorities());
		
		return Jwts.builder().claims(payload).expiration(new Date(System.currentTimeMillis() + 100000 * 60 * 60)).signWith(this.getKey()).compact();
	}
}
