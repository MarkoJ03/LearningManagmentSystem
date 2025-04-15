package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.BibliotekaKnjigaDTO;
import server.model.BibliotekaKnjiga;
import server.repository.BibliotekaKnjigaRepository;

@Service
public class BibliotekaKnjigaService extends BaseService<BibliotekaKnjiga, BibliotekaKnjigaDTO, Long> {

    @Autowired
    private BibliotekaKnjigaRepository bibliotekaKnjigaRepository;

    @Override
    protected CrudRepository<BibliotekaKnjiga, Long> getRepository() {
        return bibliotekaKnjigaRepository;
    }

    @Override
    protected BibliotekaKnjigaDTO convertToDTO(BibliotekaKnjiga entity) {
        return null;
    }

    @Override
    protected BibliotekaKnjiga convertToEntity(BibliotekaKnjigaDTO dto) {
        return null;
    }
}
