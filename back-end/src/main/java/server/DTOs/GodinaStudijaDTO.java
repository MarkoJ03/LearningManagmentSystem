package server.DTOs;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import server.model.Student;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GodinaStudijaDTO {

	private Long id;
	
	private String godina;
	
	private List<StudentDTO> studenti;
}
