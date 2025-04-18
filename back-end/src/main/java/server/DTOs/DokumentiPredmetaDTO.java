package server.DTOs;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class DokumentiPredmetaDTO {

    private Long id;

    private String silabus;

    private String akreditacija;


    private PredmetDTO predmet;

    private Boolean vidljiv = true;
}
