package server.service;


import java.util.HashSet;
import java.util.Set;

import java.util.ArrayList;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.AdresaDTO;
import server.DTOs.DodeljenoPravoPristupaDTO;
import server.DTOs.KorisnikDTO;
import server.DTOs.StudentDTO;
import server.DTOs.StudentNaGodiniDTO;
import server.model.Adresa;
import server.model.DodeljenoPravoPristupa;
import server.model.Korisnik;
import server.model.Student;
import server.model.StudentNaGodini;
import server.repository.StudentRepository;

@Service
public class StudentService extends BaseService<Student, StudentDTO, Long>{


	@Autowired
	private StudentRepository studentRepository;
	

	@Autowired
	@Lazy
	private DodeljenoPravoPristupaService dodeljenoPravoPrisupaService;
	
	@Autowired
	@Lazy
	private GradService gService;

	@Autowired
	@Lazy
	private StudentNaGodiniService studentNaGodiniService;
	
  @Override
 protected CrudRepository<Student, Long> getRepository() {
      return studentRepository;
  }

	@Override
	protected StudentDTO convertToDTO(Student entity) {

		Set<DodeljenoPravoPristupaDTO> dodeljenaPravaPristupa = new HashSet<>();
		
		for(DodeljenoPravoPristupa dpp: entity.getKorisnik().getDodeljenaPravaPristupa()) {
			DodeljenoPravoPristupaDTO dppDTO = dodeljenoPravoPrisupaService.convertToDTO(dpp);
			dodeljenaPravaPristupa.add(dppDTO);
		}
		
		ArrayList<StudentNaGodiniDTO> studenti = new ArrayList<>();
		for (StudentNaGodini s : entity.getStudentiNaGodini()) {
			StudentNaGodiniDTO sDTO = new StudentNaGodiniDTO(s.getId(), s.getBrojIndeksa(), null, null, null, null, null, null, null);
			studenti.add(sDTO);
		}
		
		KorisnikDTO korisnik= new KorisnikDTO(entity.getKorisnik().getId(), entity.getKorisnik().getEmail(), entity.getKorisnik().getLozinka(), dodeljenaPravaPristupa,entity.getKorisnik().getVidljiv());

		AdresaDTO adresa = new AdresaDTO(entity.getAdresa().getId(),gService.convertToDTO(entity.getAdresa().getGrad()),entity.getAdresa().getUlica(), entity.getAdresa().getBroj(), entity.getAdresa().getVidljiv());
		return new StudentDTO(entity.getId(),korisnik,entity.getIme(),entity.getPrezime(),entity.getJmbg(), adresa,null,studenti,entity.getVidljiv()); 
	}

	@Override
	protected Student convertToEntity(StudentDTO dto) {

		Set<DodeljenoPravoPristupa> dodeljenaPravaPristupa = new HashSet<>();
		
		for(DodeljenoPravoPristupaDTO dppDTO: dto.getKorisnik().getDodeljenaPravaPristupa()) {
			DodeljenoPravoPristupa dpp = dodeljenoPravoPrisupaService.convertToEntity(dppDTO);
			dodeljenaPravaPristupa.add(dpp);
		}
		
		ArrayList<StudentNaGodini> studenti = new ArrayList<>();
		for (StudentNaGodiniDTO s : dto.getStudentiNaGodini()) {
			StudentNaGodini sDTO = new StudentNaGodini(s.getId(), s.getBrojIndeksa(), null, null, null, null, null, null, null);
			studenti.add(sDTO);
		}
		
		Korisnik korisnik= new Korisnik(dto.getKorisnik().getId(), dto.getKorisnik().getEmail(), dto.getKorisnik().getLozinka(),dodeljenaPravaPristupa, dto.getKorisnik().getVidljiv());

		Adresa adresa = new Adresa(dto.getAdresa().getId(),gService.convertToEntity(dto.getAdresa().getGrad()),dto.getAdresa().getUlica(), dto.getAdresa().getBroj(), dto.getAdresa().getVidljiv());
		return new Student(dto.getId(),korisnik,dto.getIme(),dto.getPrezime(),dto.getJmbg(), adresa, null,studenti, dto.getVidljiv()); 	
		}

	@Override
	protected void updateEntityFromDto(StudentDTO dto, Student entity) {
		// TODO Auto-generated method stub
		
	}



}