package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.AdresaDTO;
import server.DTOs.KorisnikDTO;
import server.DTOs.StudentDTO;
import server.model.Adresa;
import server.model.Korisnik;
import server.model.Student;
import server.repository.StudentRepository;

@Service
public class StudentService extends BaseService<Student, StudentDTO, Long>{


	@Autowired
	private StudentRepository studentRepository;
	
  @Override
 protected CrudRepository<Student, Long> getRepository() {
      return studentRepository;
  }

	@Override
	protected StudentDTO convertToDTO(Student entity) {
		KorisnikDTO korisnik= new KorisnikDTO(entity.getKorisnik().getId(), entity.getKorisnik().getEmail(), entity.getKorisnik().getKorisnickoIme(), entity.getKorisnik().getLozinka(), entity.getKorisnik().getVidljiv());
		AdresaDTO adresa = new AdresaDTO(entity.getAdresa().getId(),entity.getAdresa().getDrzava(),entity.getAdresa().getGrad(),entity.getAdresa().getUlica(), entity.getAdresa().getBroj(), entity.getAdresa().getVidljiv());
		return new StudentDTO(entity.getId(),korisnik,entity.getIme(),entity.getPrezime(),entity.getJmbg(), adresa,entity.getVidljiv()); 
	}

	@Override
	protected Student convertToEntity(StudentDTO dto) {
		Korisnik korisnik= new Korisnik(dto.getKorisnik().getId(), dto.getKorisnik().getEmail(), dto.getKorisnik().getKorisnickoIme(), dto.getKorisnik().getLozinka(), dto.getKorisnik().getVidljiv());
		Adresa adresa = new Adresa(dto.getAdresa().getId(),dto.getAdresa().getDrzava(),dto.getAdresa().getGrad(),dto.getAdresa().getUlica(), dto.getAdresa().getBroj(), dto.getAdresa().getVidljiv());
		return new Student(dto.getId(),korisnik,dto.getIme(),dto.getPrezime(),dto.getJmbg(), adresa, dto.getVidljiv()); 	
		}



}