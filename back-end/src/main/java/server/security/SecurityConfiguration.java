package server.security;

import java.util.HashMap;
import java.util.Map;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.DelegatingPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import server.utils.TokenUtils;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true, prePostEnabled = true)
public class SecurityConfiguration {

	@Bean
	public PasswordEncoder getPasswordEncoder() {
		Map<String, PasswordEncoder> encoders = new HashMap<String, PasswordEncoder>();
		encoders.put("bcrypt", new BCryptPasswordEncoder());
		
		DelegatingPasswordEncoder passwordEncoder = new DelegatingPasswordEncoder("bcrypt", encoders);
		passwordEncoder.setDefaultPasswordEncoderForMatches(encoders.get("bcrypt"));
		
		return passwordEncoder;
	}
	
	@Bean 
	public AuthenticationManager getAuthenticationManager(AuthenticationConfiguration conf) throws Exception {
		return conf.getAuthenticationManager();
	}
	
	@Bean
    public AuthenticationFilterBean getAuthenticationFilterBean(
            AuthenticationConfiguration conf,
            UserDetailsService userDetailsService,
            TokenUtils tokenUtils) throws Exception {

        AuthenticationFilterBean filter = new AuthenticationFilterBean();
        filter.setAuthenticationManager(conf.getAuthenticationManager());
        filter.setUserDetailsService(userDetailsService);
        filter.setTokenUtils(tokenUtils);
        return filter;
    }
	
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.addAllowedOrigin("http://localhost:4200");
		configuration.addAllowedMethod("*");
		configuration.addAllowedHeader("*");
		configuration.setAllowCredentials(true);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http, AuthenticationConfiguration conf, AuthenticationFilterBean filter) throws Exception {
		http
		.cors(cors -> {})
		.csrf(csfr -> {
			csfr.disable();
		})
		.sessionManagement(m -> {
			m.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		})
		.authorizeHttpRequests(authorize -> authorize
			    .requestMatchers(HttpMethod.GET, "/api/fakulteti/**").permitAll()
			    .requestMatchers(HttpMethod.GET, "/api/studijski-programi/**").permitAll()
			    .requestMatchers(HttpMethod.GET, "/api/godine-studija/**").permitAll()
			    .requestMatchers(HttpMethod.GET, "/api/godina-studija-predmet/**").permitAll()
			    .requestMatchers(HttpMethod.GET, "/api/objave/**").permitAll()
			    .requestMatchers(HttpMethod.GET, "/api/adrese/**").permitAll()
			    .requestMatchers(HttpMethod.GET, "/api/biblioteke/**").permitAll()
			    .requestMatchers(HttpMethod.GET, "/api/biblioteka-knjiga/**").permitAll()
			    .requestMatchers(HttpMethod.GET, "/api/departmani/**").permitAll()
			    .requestMatchers(HttpMethod.GET, "/api/departman-nastavnik/**").permitAll()
			    .requestMatchers(HttpMethod.GET, "/api/dodeljena-prava-pristupa/**").permitAll()
			    .requestMatchers(HttpMethod.GET, "/api/dokumenti-predmeta/**").permitAll()
			    .requestMatchers(HttpMethod.GET, "/api/Drzava/**").permitAll()
			    .requestMatchers(HttpMethod.GET, "/api/evaluacije-znanja/**").permitAll()
			    .requestMatchers(HttpMethod.GET, "/api/godina-studija-predmet/**").permitAll()
			    .requestMatchers(HttpMethod.GET, "/api/Grad/**").permitAll()
			    .requestMatchers(HttpMethod.GET, "/api/grupe-studenata/**").permitAll()
			    .requestMatchers(HttpMethod.GET, "/api/grupa-studenata-predmet/**").permitAll()
			    .requestMatchers(HttpMethod.GET, "/api/ishodi-evaluacije/**").permitAll()
			    .requestMatchers(HttpMethod.GET, "/api/ishod-predmeta/**").permitAll()
			    .requestMatchers(HttpMethod.GET, "/api/IspitniRok/**").permitAll()
			    .requestMatchers(HttpMethod.GET, "/api/kalendari/**").permitAll()
			    .requestMatchers(HttpMethod.GET, "/api/katedre/**").permitAll()
			    .requestMatchers(HttpMethod.GET, "/api/katedra-nastavnik/**").permitAll()
			    .requestMatchers(HttpMethod.GET, "/api/knjige/**").permitAll()
			    .requestMatchers(HttpMethod.GET, "/api/korisnici/**").permitAll()
			    .requestMatchers(HttpMethod.GET, "/api/nastavnici/**").permitAll()
			    .requestMatchers(HttpMethod.GET, "/api/naucne-oblasti/**").permitAll()
			    .requestMatchers(HttpMethod.GET, "/api/obavestenja/**").permitAll()
			    .requestMatchers(HttpMethod.GET, "/api/prava-pristupa/**").permitAll()
			    .requestMatchers(HttpMethod.GET, "/api/predmeti/**").permitAll()
			    .requestMatchers(HttpMethod.GET, "/api/realizacije-predmeta/**").permitAll()
			    .requestMatchers(HttpMethod.GET, "/api/Silabus/**").permitAll()
			    .requestMatchers(HttpMethod.GET, "/api/SilabusTermin/**").permitAll()
			    .requestMatchers(HttpMethod.GET, "/api/studenti/**").permitAll()
			    .requestMatchers(HttpMethod.PUT, "/api/studenti/**").hasAnyRole("STUDENT")
			    .requestMatchers(HttpMethod.GET, "/api/studenti-na-godini/**").permitAll()
			    .requestMatchers(HttpMethod.GET, "/api/studentske-sluzbe/**").permitAll()
			    .requestMatchers(HttpMethod.GET, "/api/termini-nastave/**").permitAll()
			    .requestMatchers(HttpMethod.GET, "/api/tipovi-evaluacije/**").permitAll()
			    .requestMatchers(HttpMethod.GET, "/api/tipovi-nastave/**").permitAll()
			    .requestMatchers(HttpMethod.GET, "/api/tipovi-programa/**").permitAll()
			    .requestMatchers(HttpMethod.GET, "/api/tipovi-zvanja/**").permitAll()
			    .requestMatchers(HttpMethod.GET, "/api/univerziteti/**").permitAll()
			    .requestMatchers(HttpMethod.GET, "/api/zvanja/**").permitAll()
			    .requestMatchers("/api/auth/**").permitAll()

			    .requestMatchers("/api/studijski-programi/**", "/api/godine-studija/**", 
			    		"/api/objave/**","/api/godina-studija-predmet/**", "/api/adrese/**", "/api/biblioteke/**",
			    		"/api/biblioteka-knjiga/**", "/api/departman-nastavnik/**", "/api/dodeljena-prava-pristupa/**",
			    		"/api/dokumenti-predmeta/**", "/api/Drzava/**", "/api/godina-studija-predmet/**",
			    		"/api/Grad/**", "/api/grupe-studenata/**", "/api/grupa-studenata-predmet/**",
			    		"/api/inventari/**", "/api/IspitniRok/**", "/api/kalendari/**", "/api/katedre/**",
			    		"/api/katedra-nastavnik/**", "/api/knjige/**", "/api/korisnici/**", "/api/studenti/**",
			    		"/api/studenti-na-godini/**", "/api/studentske-sluzbe/**", "/api/tipovi-programa/**")
			        .hasAnyRole("ADMIN", "STUDENTSKA_SLUZBA")
			        
			    .requestMatchers("/api/departmani/**", "/api/prava-pristupa/**", "/api/univerziteti/**",
			    		"/api/fakulteti/**")
			    	.hasAnyRole("ADMIN")
			    	
			    .requestMatchers("/api/evaluacije-znanja/**", "/api/nastavnici/**", "/api/naucne-oblasti/**",
			    		"/api/predmeti/**", "/api/termini-nastave/**", "/api/tipovi-evaluacije/**", "/api/tipovi-nastave/**",
			    		"/api/tipovi-zvanja/**", "/api/zvanja/**")
			    	.hasAnyRole("ADMIN", "STUDENTSKA_SLUZBA", "NASTAVNIK")
			    	
			    .requestMatchers("/api/ishodi-evaluacije/**", "/api/ishod-predmeta/**", "/api/obavestenja/**",
			    		"/api/realizacije-predmeta/**", "/api/Silabus/**", "/api/SilabusTermin/**")
			    	.hasAnyRole("ADMIN", "NASTAVNIK")
			    	
			    .requestMatchers("/api/sv-obrazac/**")
			    	.hasAnyRole("ADMIN", "STUDENTSKA_SLUZBA", "STUDENT")

			    .anyRequest().authenticated()
			)
		.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}


}
