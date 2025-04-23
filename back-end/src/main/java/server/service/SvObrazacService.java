package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;
import server.DTOs.SvObrazacDTO;
import server.model.SvObrazac;
import server.repository.SvObrazacRepository;

@Service
public class SvObrazacService extends BaseService<SvObrazac, SvObrazacDTO, Long> {

    @Autowired
    private SvObrazacRepository svObrazacRepository;

    @Override
    protected CrudRepository<SvObrazac, Long> getRepository() {
        return svObrazacRepository;
    }

    @Override
    protected SvObrazacDTO convertToDTO(SvObrazac entity) {
        return new SvObrazacDTO(
            entity.getId(),
            entity.getMaternjiJezik(),
            entity.getVrstaZavreseneSrednje(),
            entity.getDatumZavrsetkaSrednje(),
            entity.getBracniStatus(),
            entity.getKontakt(),
            entity.getZaposlen(),
            entity.getNacinFinansiranja(),
            null,
            null,
            entity.getVidljiv()
        );
    }

    @Override
    protected SvObrazac convertToEntity(SvObrazacDTO dto) {
        return new SvObrazac(
            dto.getId(),
            dto.getMaternjiJezik(),
            dto.getVrstaZavreseneSrednje(),
            dto.getDatumZavrsetkaSrednje(),
            dto.getBracniStatus(),
            dto.getKontakt(),
            dto.getZaposlen(),
            dto.getNacinFinansiranja(),
            null,
            null,
            dto.getVidljiv()
        );
    }
}
