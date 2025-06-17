package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.OsobljeDTO;
import server.model.Osoblje;
import server.model.StudentskaSluzba;
import server.repository.OsobljeRepository;

@Service
public class OsobljeService extends BaseService<Osoblje, OsobljeDTO, Long> {

    @Autowired
    private OsobljeRepository osobljeRepository;
    
    @Autowired
    @Lazy
    private KorisnikService kService;

    @Override
    protected CrudRepository<Osoblje, Long> getRepository() {
        return osobljeRepository;
    }

    @Override
    protected OsobljeDTO convertToDTO(Osoblje entity) {


    	
        return new OsobljeDTO(
        		entity.getId(),
        		kService.convertToDTO(entity.getKorisnik()),
        		entity.getIme(),
        		entity.getPrezime(),
        		entity.getJmbg(),
        		null,
        		entity.getVidljiv()
            );
    }

    @Override
    protected Osoblje convertToEntity(OsobljeDTO dto) {
    	

        return new Osoblje(
        		dto.getId(),
        		kService.convertToEntity(dto.getKorisnik()),
        		dto.getIme(),
        		dto.getPrezime(),
        		dto.getJmbg(),
        		null,
        		dto.getVidljiv()
            );
    }

}
