package server.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import server.utils.TokenUtils;


public class AuthenticationFilterBean extends UsernamePasswordAuthenticationFilter {
	
	@Autowired
	private TokenUtils tokenUtils;
	
	@Autowired
	private UserDetailsService userDetailsService;
	
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		
		String token = ((HttpServletRequest) request).getHeader("Authorization");
		
		if(tokenUtils.validateToken(token) && SecurityContextHolder.getContext().getAuthentication() == null) {
			String username = tokenUtils.getUsername(token);
			
			UserDetails user = userDetailsService.loadUserByUsername(username);
			UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(user.getUsername(), null, user.getAuthorities());
			auth.setDetails(new WebAuthenticationDetailsSource().buildDetails((HttpServletRequest) request));
			
			SecurityContextHolder.getContext().setAuthentication(auth);
		}
		
		super.doFilter(request, response, chain);
	}
}
