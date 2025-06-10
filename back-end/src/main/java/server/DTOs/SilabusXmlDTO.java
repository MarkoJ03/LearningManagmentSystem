package server.DTOs;

import java.util.List;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SilabusXmlDTO {
    @JacksonXmlElementWrapper(localName = "termini")
    @JacksonXmlProperty(localName = "termin")
    private List<SilabusTerminXmlDTO> termini;
}

