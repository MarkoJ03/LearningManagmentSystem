package server.DTOs;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class GodinaStudijaDTO {

	private Long id;

	private String godina;

	private List<StudentNaGodiniDTO> studentiNaGodini;

	private StudijskiProgramDTO studijskiProgram;

	private Boolean vidljiv = true;
}
