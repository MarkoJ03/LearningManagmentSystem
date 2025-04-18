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

		}



}