package server.DTOs;

import java.util.List;

import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import server.model.DokumentiPredmeta;
import server.model.EvaluacijaZnanja;
import server.model.GrupaStudenataPredmet;
import server.model.Obavestenje;
import server.model.RealizacijaPredmeta;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PredmetDTO {

	private Long id;

	private String naziv;

	private Integer esbp;


	private Boolean obavezan;


	private Integer brojPredavanja;


	private Integer brojVezbi;


	private Boolean istrazivackiRad;


	private Integer brojSemestara;


	private String opis;


	private String cilj;


    private DokumentiPredmetaDTO dokumentiPredmeta;


	private List<EvaluacijaZnanjaDTO> evaluacijeZnanja;


	private List<GrupaStudenataPredmetDTO> grupeStudenata;


    private List<PredmetRealizacijePredmetaDTO> realizacijePredmeta;
    
    private List<ObavestenjeDTO> obavestenja;

    private Boolean vidljiv = true;
}
