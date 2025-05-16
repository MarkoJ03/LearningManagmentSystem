package server.DTOs;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@AllArgsConstructor
@NoArgsConstructor
@Data
public class GrupaStudenataPredmetDTO {

	private Long id;


	private GrupaStudenataDTO grupaStudenata;

	private PredmetDTO predmet;


    private Boolean vidljiv = true;
}
