package server.DTOs;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import server.model.Katedra;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class DepartmanDTO {

	private Long id;

	private String naziv;

	private FakultetDTO fakultet;


	private NastavnikDTO sekretarDepartmana;


	private NastavnikDTO direktorDepartmana;


	private List<DepartmanNastavnikDTO> nastavnici;
	
	private List<KatedraDTO> katedre;

	private Boolean vidljiv = true;
}
