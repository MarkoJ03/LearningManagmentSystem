package server.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdresaDTO {

	private Long id;
	private GradDTO grad;
	private String ulica;
	private String broj;
	private Boolean vidljiv = true;
}
