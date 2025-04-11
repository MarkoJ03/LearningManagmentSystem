package server.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Predmet {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false)
	private Integer esbp;
	@Column(nullable = false)
	private Boolean obavezan;
	@Column(nullable = false)
	private Integer brojPredavanja;
	@Column(nullable = false)
	private Integer brojVezbi;
	@Column(nullable = false)
	private Boolean istrazivackiRad;
	@Column(nullable = false)
	private Integer brojSemestara;
	@Column(nullable = false)
	private String opis;
	@Column(nullable = false)
	private String cilj;
    @OneToOne
    @JoinColumn(name = "dokumenti_id", nullable = false)
    private DokumentiPredmeta dokumentiPredmeta;
	
    @OneToMany
    private List<RealizacijaPredmeta> realizacijePredmeta;
    
    @Column(nullable = false)
    private Boolean vidljiv = true;
}
