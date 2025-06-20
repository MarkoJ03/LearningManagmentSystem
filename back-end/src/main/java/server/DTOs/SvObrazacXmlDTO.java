package server.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SvObrazacXmlDTO {

	private StudentNaGodiniXmlDTO studentNaGodini;
    private String maternjiJezik;
    private String vrstaZavreseneSrednje;
    private String datumZavrsetkaSrednje;

    private String bracniStatus;
    private String kontakt;



    private String zaposlen;
    private String nacinFinansiranja;
}
