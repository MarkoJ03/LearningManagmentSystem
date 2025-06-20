package server.DTOs;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class NaucnaOblastDTO {

	private Long id;

	private String naziv;


	private List<ZvanjeDTO> zvanja;

	private Boolean vidljiv = true;
}
