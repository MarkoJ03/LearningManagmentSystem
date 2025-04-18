package server.DTOs;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class KatedraDTO {

	private Long id;


	private String naziv;


	private DepartmanDTO departman;


	private NastavnikDTO sekretarKatedre;


	private NastavnikDTO sefKatedre;


	private List<KatedraNastavnikDTO> nastavnici;

	private Boolean vidljiv = true;
}
