package server.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Fakultet {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String naziv;

	@ManyToOne(optional = false)
	private Univerzitet univerzitet;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "fakultet")
	private List<Departman> departmani;


	@OneToOne
    @JoinColumn(name = "id")
    private Fakultet fakultet;


    @Column(nullable = false)
    private Boolean vidljiv = true;
}
