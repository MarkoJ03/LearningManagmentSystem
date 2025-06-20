package server.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Obavestenje {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false)
	private String naslov;
	@Column(nullable = false)
	private String sadrzaj;
	@ManyToOne
	private Nastavnik nastavnik;
	@ManyToOne
	private Predmet predmet;
    @Column(nullable = false)
    private Boolean vidljiv = true;
}
