package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;
import server.DTOs.KalendarDTO;
import server.model.Kalendar;
import server.repository.KalendarRepository;


@Service
public class KalendarService extends BaseService<Kalendar, KalendarDTO, Long> {

    @Autowired
    private KalendarRepository kalendarRepository;

    @Override
    protected CrudRepository<Kalendar, Long> getRepository() {
        return kalendarRepository;
    }

    @Override
    protected KalendarDTO convertToDTO(Kalendar entity) {
        return new KalendarDTO(
            entity.getId(),
            null, 
            null, 
            null, 
            null, 
            entity.getVidljiv()
        );
    }

    @Override
    protected Kalendar convertToEntity(KalendarDTO dto) {
        return new Kalendar(
            dto.getId(),
            null, 
            null, 
            null, 
            null, 
            dto.getVidljiv()
        );
    }
    public Kalendar getById(Long id) {
        return kalendarRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Kalendar sa id " + id + " nije pronađen."));
    }
    
    public KalendarDTO findByNastavnikId(Long nastavnikId) {
        Kalendar kalendar = kalendarRepository.findKalendarByNastavnikId(nastavnikId);
        return convertToDTO(kalendar);
    }
    //ako se implementira kako treba
//    @Override
//    protected KalendarDTO convertToDTO(Kalendar entity) {
//        return new KalendarDTO(
//            entity.getId(),
//            null, // studentskaSluzba
//            entity.getEvaluacijaZnanja().stream().map(ev -> /* mapiraj u DTO */ null).toList(),
//            entity.getGrupaStudenata().stream().map(gs -> /* mapiraj u DTO */ null).toList(),
//            entity.getTerminiNastave().stream().map(tn -> /* mapiraj u DTO */ null).toList(),
//            entity.getVidljiv()
//        );
//    }

	@Override
	protected void updateEntityFromDto(KalendarDTO dto, Kalendar entity) {
		// TODO Auto-generated method stub
		
	}

}
