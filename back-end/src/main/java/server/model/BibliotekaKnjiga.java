package server.model;




import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import server.DTOs.BibliotekaDTO;
import server.DTOs.KnjigaDTO;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BibliotekaKnjiga {

	@ManyToOne(optional = false)
	private Biblioteka biblioteka;
	
	@ManyToOne(optional = false)
	private Knjiga knjiga;
	
	@Column(nullable = false)
    private Boolean vidljiv = true;
}
