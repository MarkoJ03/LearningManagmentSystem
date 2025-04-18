package server.DTOs;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentNaGodiniDTO {

	private Long id;
	private String brojIndeksa;
	private Date datumUpisa;
	private StudentDTO student;
	private GodinaStudijaDTO godinaStudija;

	private Boolean vidljiv = true;
}
