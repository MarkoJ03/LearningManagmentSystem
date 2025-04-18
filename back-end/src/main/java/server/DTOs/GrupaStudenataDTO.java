package server.DTOs;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class GrupaStudenataDTO {

private Long id;

	private List<StudentNaGodiniDTO> studentNaGodini;

	private List<GrupaStudenataPredmetDTO> grupaStudenataPredmet;

	private KalendarDTO kalendar;

    private Boolean vidljiv = true;
}
