package server.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IshodPredmetaDTO {
	private Long id;
	private Integer ocena;
	private RealizacijaPredmetaDTO realizacijaPredmeta;
}
