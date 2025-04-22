package server.DTOs;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import server.model.StudentNaGodini;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class IshodEvaluacijeDTO {

private Long id;

	private String napomena;

	private Integer bodovi;

	private StudentNaGodiniDTO studentNaGodini;

	private EvaluacijaZnanjaDTO evaluacijaZnanja;

    private Boolean vidljiv = true;
}
