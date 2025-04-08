package server.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GodinaStudijaPredmet {
	@Column(nullable = false)
	private GodinaStudija godinaStudija;
	@Column(nullable = false)
	private Predmet predmet;
}
