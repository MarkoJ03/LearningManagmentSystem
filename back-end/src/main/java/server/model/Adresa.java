package server.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Adresa {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String drzava;

	@Column(nullable = false)
	private String grad;

	@Column(nullable = false)
	private String ulica;

	@Column(nullable = false)
	private String broj;

    @Column(nullable = false)
    private Boolean vidljiv = true;

}
