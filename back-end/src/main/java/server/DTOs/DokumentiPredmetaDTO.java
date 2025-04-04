package server.DTOs;

import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import server.model.Predmet;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class DokumentiPredmetaDTO {

    private Long id;

    private String silabus;
    
    private String akreditacija;


    private PredmetDTO predmet;
}
