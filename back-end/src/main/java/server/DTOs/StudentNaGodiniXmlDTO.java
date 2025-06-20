package server.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentNaGodiniXmlDTO {
    private String brojIndeksa;
    private StudentXmlDTO student;
}
