package server.DTOs;

import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PravoPristupaDTO {
	private Long id;
	private String naziv;
	private Set<DodeljenoPravoPristupaDTO> dodeljenaPravaPristupa;
    private Boolean vidljiv = true;
}
