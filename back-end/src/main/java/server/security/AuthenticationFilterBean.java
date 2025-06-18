package server.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import server.utils.TokenUtils;


public class AuthenticationFilterBean extends UsernamePasswordAuthenticationFilter {
//public class AuthenticationFilterBean extends OncePerRequestFilter {

	@Autowired
	private TokenUtils tokenUtils;
	
	@Autowired
	private UserDetailsService userDetailsService;
	
	public void setUserDetailsService(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    public void setTokenUtils(TokenUtils tokenUtils) {
        this.tokenUtils = tokenUtils;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        String token = ((HttpServletRequest) request).getHeader("Authorization");

        if (token != null && tokenUtils.validateToken(token) && SecurityContextHolder.getContext().getAuthentication() == null) {
            String username = tokenUtils.getUsername(token);
            UserDetails user = userDetailsService.loadUserByUsername(username);

            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                    user.getUsername(), null, user.getAuthorities());

            auth.setDetails(new WebAuthenticationDetailsSource().buildDetails((HttpServletRequest) request));
            SecurityContextHolder.getContext().setAuthentication(auth);
        }

        super.doFilter(request, response, chain);
    }
    
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
//            throws ServletException, IOException {
//
//        // Get the token from the Authorization header
//        String authHeader = request.getHeader("Authorization");
//        String token = null;
//        if (authHeader != null && authHeader.startsWith("Bearer ")) {
//            token = authHeader.substring(7); // Extract the actual token
//        }
//
//
//        // Only process if a token exists and the user is not already authenticated
//        if (token != null && !token.isEmpty() && SecurityContextHolder.getContext().getAuthentication() == null) {
//            try {
//                if (tokenUtils.validateToken(token)) {
//                    String username = tokenUtils.getUsername(token);
//                    UserDetails user = userDetailsService.loadUserByUsername(username);
//
//                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
//                            user, null, user.getAuthorities());
//
//                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//                    SecurityContextHolder.getContext().setAuthentication(authentication);
//                }
//            } catch (Exception e) {
//                // Log the error but do NOT send a 403 or stop the chain
//                // Spring Security's FilterSecurityInterceptor will handle unauthorized access later
//                logger.warn("JWT token validation failed for request: " + request.getRequestURI(), e);
//            }
//        }
//
//        // **CRITICAL:** Always pass the request to the next filter in the chain.
//        // This ensures that Spring Security's FilterSecurityInterceptor (which processes
//        // `authorizeHttpRequests` and `@PreAuthorize`) gets a chance to evaluate the request.
//        chain.doFilter(request, response);
//    }
}
