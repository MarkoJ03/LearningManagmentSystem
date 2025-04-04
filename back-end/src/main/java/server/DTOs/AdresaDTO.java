package server.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdresaDTO {

	private Long id;
	private String drzava;
	private String grad;
	private String ulica;
	private String broj;
}
