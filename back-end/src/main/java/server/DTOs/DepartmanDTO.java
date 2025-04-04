package server.DTOs;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import server.model.DepartmanNastavnik;
import server.model.Fakultet;
import server.model.Nastavnik;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class DepartmanDTO {

	private Long id;
	

	private Fakultet fakultet;
	

	private Nastavnik sekretarDepartmana;
	
	
	private Nastavnik direktorDepartmana;
	
	
	private List<DepartmanNastavnikDTO> nastavnici;
}
