package server.model;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "dodeljenaPravaPristupa")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
public class PravoPristupa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;
	@Column
	private String naziv;
	@OneToMany(mappedBy = "pravoPristupa")
	private Set<DodeljenoPravoPristupa> dodeljenaPravaPristupa;
	
	@Column(nullable = false)
    private Boolean vidljiv = true;
}
