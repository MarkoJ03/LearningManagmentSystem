package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.GodinaStudijaDTO;
import server.DTOs.StudentNaGodiniDTO;

import server.model.GodinaStudija;
import server.model.StudentNaGodini;
import server.repository.StudentNaGodiniRepository;


@Service
public class StudentNaGodiniService extends BaseService<StudentNaGodini, StudentNaGodiniDTO, Long>{


	@Autowired
	private StudentNaGodiniRepository studentNaGodiniRepository;

	@Autowired
	@Lazy
	private StudentService studentService;

  @Override
 protected CrudRepository<StudentNaGodini, Long> getRepository() {
      return studentNaGodiniRepository;
  }

	@Override
	protected StudentNaGodiniDTO convertToDTO(StudentNaGodini entity) {

		}



}