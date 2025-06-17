package server.DTOs;

import java.util.List;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JacksonXmlRootElement(localName = "Silabus")
public class SilabusXmlDTO {

    @JacksonXmlElementWrapper(localName = "termini")
    @JacksonXmlProperty(localName = "termin")
    private List<TerminXmlDTO> termini;
}

