package server.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GradXmlDTO {
    private String naziv;
    private DrzavaXmlDTO drzava;
}
