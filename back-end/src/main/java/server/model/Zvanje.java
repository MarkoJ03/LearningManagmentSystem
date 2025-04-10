package server.model;

import java.util.Date;

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
public class Zvanje {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable=true)
	private Date datumIzbora;
	@Column(nullable=true)
	private Date datumPrestanka;
	
	@ManyToOne(optional = false)
	private TipZvanja tipZvanja;
	
	@ManyToOne(optional = false)
	private NaucnaOblast naucnaOblast;
	
	@ManyToOne(optional=false)
	private Nastavnik nastavnik;
	
    @Column(nullable = false)
    private Boolean vidljiv = true;
}
