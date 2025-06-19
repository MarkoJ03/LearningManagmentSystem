package server.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Predmet {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false)
	private String naziv;
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
	
    @OneToOne(optional = true)
    @JoinColumn(name = "dokumenti_id", nullable = true)
    private DokumentiPredmeta dokumentiPredmeta;

    @OneToMany (fetch= FetchType.LAZY, mappedBy = "predmet", cascade = {CascadeType.ALL}, orphanRemoval = true)
    @ToString.Exclude 
    @EqualsAndHashCode.Exclude 
    private List<EvaluacijaZnanja> evaluacijeZnanja;

    @OneToMany (fetch= FetchType.LAZY, mappedBy = "predmet", cascade = {CascadeType.ALL}, orphanRemoval = true)
    @ToString.Exclude 
    @EqualsAndHashCode.Exclude 
    private List<GrupaStudenataPredmet> grupeStudenata;
    
    @OneToMany(fetch= FetchType.LAZY, mappedBy = "predmet", cascade = {CascadeType.ALL}, orphanRemoval = true)
    @ToString.Exclude 
    @EqualsAndHashCode.Exclude 
    private List<PredmetRealizacijePredmeta> realizacijePredmeta;

    @OneToMany(fetch= FetchType.LAZY, mappedBy = "predmet", cascade = {CascadeType.ALL}, orphanRemoval = true)
    @ToString.Exclude 
    @EqualsAndHashCode.Exclude 
    private List<Obavestenje> obavestenja;
    
    @Column(nullable = false)
    private Boolean vidljiv = true;

}
