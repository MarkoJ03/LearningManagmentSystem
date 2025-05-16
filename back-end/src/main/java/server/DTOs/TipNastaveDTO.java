package server.DTOs;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TipNastaveDTO {
	private Long id;
	private String naziv;
	private List<RealizacijaPredmetaDTO> realizacijaPredmeta;
	private Boolean vidljiv = true;
}
