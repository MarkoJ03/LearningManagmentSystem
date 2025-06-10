package server.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SvObrazacXmlDTO {

    private String ime;
    private String prezime;
    private String brojIndeksa;
    private String jmbg;

    private String maternjiJezik;
    private String vrstaZavreseneSrednje;
    private String datumZavrsetkaSrednje;

    private String bracniStatus;
    private String kontakt;

    private String adresaUlica;
    private String adresaBroj;
    private String adresaGrad;
    private String adresaDrzava;

    private String zaposlen;
    private String nacinFinansiranja;
}
