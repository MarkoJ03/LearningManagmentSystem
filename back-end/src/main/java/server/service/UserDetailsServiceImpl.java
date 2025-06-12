package server.service;

import java.util.ArrayList;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import server.model.DodeljenoPravoPristupa;
import server.model.Korisnik;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{

	@Autowired
	private KorisnikService korisnikService;
	
	public UserDetailsServiceImpl(KorisnikService korisnikService) {
        this.korisnikService = korisnikService;
    }
	
	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//		Korisnik k = korisnikService.findByEmail(username);

		Korisnik k = korisnikService.findByEmailWithPrivileges(username);
		if(k != null) {
			
			//Hibernate.initialize(k.getDodeljenaPravaPristupa());
			//k.getDodeljenaPravaPristupa().size();  
			
			
			ArrayList<GrantedAuthority> grantedAuthorities = new ArrayList<GrantedAuthority>();
			for(DodeljenoPravoPristupa dodeljenoPravo : k.getDodeljenaPravaPristupa()) {
				grantedAuthorities.add(new SimpleGrantedAuthority(dodeljenoPravo.getPravoPristupa().getNaziv()));			
			}			
			
//			ArrayList<GrantedAuthority> grantedAuthorities = new ArrayList<GrantedAuthority>();
//            // Provera za null kolekciju je dobra praksa
//            if (k.getDodeljenaPravaPristupa() != null) {
//                for(DodeljenoPravoPristupa dodeljenoPravo : k.getDodeljenaPravaPristupa()) {
//                    // Dodatna provera da pravoPristupa nije null pre pristupa nazivu
//                    if (dodeljenoPravo.getPravoPristupa() != null) {
//                         grantedAuthorities.add(new SimpleGrantedAuthority(dodeljenoPravo.getPravoPristupa().getNaziv()));
//                    }
//                }
//            }
			
			return new User(k.getEmail(), k.getLozinka(), grantedAuthorities);
		}
		
		throw new UsernameNotFoundException("Nepostojeci korisnik!");
	}

}
