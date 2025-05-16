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
public class TerminNastave {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false)
	private Date vremePocetka;
	@Column(nullable = false)
	private Date vremeKraja;
	@Column(nullable = false)
	private Integer brojCasova;
	@ManyToOne
	private RealizacijaPredmeta realizacijaPredmeta;
	@ManyToOne
	private Kalendar kalendar;

    @Column(nullable = false)
    private Boolean vidljiv = true;
}
