package server.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.AdresaDTO;
import server.DTOs.KorisnikDTO;
import server.DTOs.StudentDTO;
import server.DTOs.StudentNaGodiniDTO;
import server.DTOs.ZvanjeDTO;
import server.model.Adresa;
import server.model.Korisnik;
import server.model.Student;
import server.model.StudentNaGodini;
import server.model.Zvanje;
import server.repository.StudentRepository;

@Service
public class StudentService extends BaseService<Student, StudentDTO, Long>{


	@Autowired
	private StudentRepository studentRepository;
	
	
	@Autowired
	@Lazy
	private StudentNaGodiniService studentNaGodiniService;
	
  @Override
 protected CrudRepository<Student, Long> getRepository() {
      return studentRepository;
  }

	@Override
	protected StudentDTO convertToDTO(Student entity) {
		
		ArrayList<StudentNaGodiniDTO> studenti = new ArrayList<>();
		for (StudentNaGodini s : entity.getStudentiNaGodini()) {
			StudentNaGodiniDTO sDTO = new StudentNaGodiniDTO(s.getId(), s.getBrojIndeksa(), null, null, null, null, null, null, null);
			studenti.add(sDTO);
		}
		
		KorisnikDTO korisnik= new KorisnikDTO(entity.getKorisnik().getId(), entity.getKorisnik().getEmail(), entity.getKorisnik().getLozinka(), entity.getKorisnik().getVidljiv());
		AdresaDTO adresa = new AdresaDTO(entity.getAdresa().getId(),entity.getAdresa().getDrzava(),entity.getAdresa().getGrad(),entity.getAdresa().getUlica(), entity.getAdresa().getBroj(), entity.getAdresa().getVidljiv());
		return new StudentDTO(entity.getId(),korisnik,entity.getIme(),entity.getPrezime(),entity.getJmbg(), adresa,null,studenti,entity.getVidljiv()); 
	}

	@Override
	protected Student convertToEntity(StudentDTO dto) {
		
		
		ArrayList<StudentNaGodini> studenti = new ArrayList<>();
		for (StudentNaGodiniDTO s : dto.getStudentiNaGodini()) {
			StudentNaGodini sDTO = new StudentNaGodini(s.getId(), s.getBrojIndeksa(), null, null, null, null, null, null, null);
			studenti.add(sDTO);
		}
		
		
		Korisnik korisnik= new Korisnik(dto.getKorisnik().getId(), dto.getKorisnik().getEmail(), dto.getKorisnik().getLozinka(), dto.getKorisnik().getVidljiv());
		Adresa adresa = new Adresa(dto.getAdresa().getId(),dto.getAdresa().getDrzava(),dto.getAdresa().getGrad(),dto.getAdresa().getUlica(), dto.getAdresa().getBroj(), dto.getAdresa().getVidljiv());
		return new Student(dto.getId(),korisnik,dto.getIme(),dto.getPrezime(),dto.getJmbg(), adresa, null,studenti, dto.getVidljiv()); 	
		}



}