package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import server.DTOs.KalendarDTO;
import server.DTOs.NastavnikDTO;
import server.DTOs.PredmetDTO;
import server.DTOs.StudentskaSluzbaDTO;
import server.DTOs.EvaluacijaZnanjaDTO;
import server.DTOs.GrupaStudenataDTO;
import server.DTOs.TerminNastaveDTO;
import server.DTOs.TipEvaluacijeDTO;
import server.DTOs.RealizacijaPredmetaDTO; // Added this import
import server.model.Kalendar;
import server.model.StudentskaSluzba;
import server.model.EvaluacijaZnanja;
import server.model.GrupaStudenata;
import server.model.TerminNastave;

import server.repository.KalendarRepository;
import server.repository.StudentskaSluzbaRepository;
import server.repository.EvaluacijaZnanjaRepository; // Assuming you have this
import server.repository.GrupaStudenataRepository; // Assuming you have this
import server.repository.TerminNastaveRepository; // Assuming you have this

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class KalendarService extends BaseService<Kalendar, KalendarDTO, Long> {

    @Autowired
    private KalendarRepository kalendarRepository;

    @Autowired
    private StudentskaSluzbaRepository studentskaSluzbaRepository;
    @Autowired
    private EvaluacijaZnanjaRepository evaluacijaZnanjaRepository; 
    @Autowired
    private GrupaStudenataRepository grupaStudenataRepository;     
    @Autowired
    private TerminNastaveRepository terminNastaveRepository;     


    


    @Override
    protected CrudRepository<Kalendar, Long> getRepository() {
        return kalendarRepository;
    }

    @Override
    protected KalendarDTO convertToDTO(Kalendar entity) {
        
    	  StudentskaSluzbaDTO studentskaSluzbaDTO = null;
          if (entity.getStudentskaSluzba() != null) {
              studentskaSluzbaDTO = new StudentskaSluzbaDTO(
                  entity.getStudentskaSluzba().getId(),
                 
                  null, null, null, null, null, null,
                  entity.getStudentskaSluzba().getVidljiv()
              );
          }
        
        List<EvaluacijaZnanjaDTO> evaluacijaZnanjaDTO = new ArrayList<>();
        if (entity.getEvaluacijaZnanja() != null) {
            for (EvaluacijaZnanja ez : entity.getEvaluacijaZnanja()) {
                
                PredmetDTO predmetDTO = null;
                if (ez.getPredmet() != null) {
                    predmetDTO = new PredmetDTO(ez.getPredmet().getId(), null, null, null,null, null, null, null, null, null, null, null, null, null, null, ez.getPredmet().getVidljiv());
                }

                NastavnikDTO nastavnikDTO = null;
                if (ez.getNastavnik() != null) {
                    nastavnikDTO = new NastavnikDTO(ez.getNastavnik().getId(), ez.getNastavnik().getIme(), ez.getNastavnik().getPrezime(), null, null, null, null, null, null, null, ez.getNastavnik().getVidljiv());
                }

                TipEvaluacijeDTO tipEvaluacijeDTO = null;
                if (ez.getTipEvaluacije() != null) {
                    tipEvaluacijeDTO = new TipEvaluacijeDTO(ez.getTipEvaluacije().getId(),ez.getTipEvaluacije().getNaziv(),null, ez.getTipEvaluacije().getVidljiv());
                }

                EvaluacijaZnanjaDTO ezDTO = new EvaluacijaZnanjaDTO(
                    ez.getId(),
                    ez.getVremePocetka(),
                    ez.getVremeZavrsetka(),
                    null, 
                    predmetDTO,
                    nastavnikDTO,
                    tipEvaluacijeDTO,
                    null, 
                    ez.getVidljiv()
                );
                evaluacijaZnanjaDTO.add(ezDTO);
            }
        }

        
        List<GrupaStudenataDTO> grupaStudenataDTO = new ArrayList<>();
        if (entity.getGrupaStudenata() != null) {
            for (GrupaStudenata gs : entity.getGrupaStudenata()) {
                GrupaStudenataDTO gsDTO = new GrupaStudenataDTO(
                    gs.getId(),
                    null, 
                    null, 
                    null, 
                    gs.getVidljiv()
                );
                grupaStudenataDTO.add(gsDTO);
            }
        }

        
        List<TerminNastaveDTO> terminiNastaveDTO = new ArrayList<>();
        if (entity.getTerminiNastave() != null) {
            for (TerminNastave tn : entity.getTerminiNastave()) {
                TerminNastaveDTO tnDTO = new TerminNastaveDTO(
                    tn.getId(),
                    tn.getVremePocetka(),
                    tn.getVremeKraja(),
                    tn.getBrojCasova(),
                    tn.getRealizacijaPredmeta() != null ? new RealizacijaPredmetaDTO(tn.getRealizacijaPredmeta().getId(), null, null, null, null, null, tn.getRealizacijaPredmeta().getVidljiv()) : null,
                    null, 
                    tn.getVidljiv()
                );
                terminiNastaveDTO.add(tnDTO);
            }
        }

        
        return new KalendarDTO(
            entity.getId(),
            studentskaSluzbaDTO,
            evaluacijaZnanjaDTO,
            grupaStudenataDTO,
            terminiNastaveDTO,
            entity.getVidljiv()
        );
    }

    @Override
    protected Kalendar convertToEntity(KalendarDTO dto) {
        Kalendar kalendar = new Kalendar();
        kalendar.setId(dto.getId()); 

        
        kalendar.setVidljiv(dto.getVidljiv() != null ? dto.getVidljiv() : true);

       
        if (dto.getStudentsaSluzba() != null && dto.getStudentsaSluzba().getId() != null) {
            StudentskaSluzba studentskaSluzba = studentskaSluzbaRepository.findById(dto.getStudentsaSluzba().getId())
                .orElseThrow(() -> new RuntimeException("StudentskaSluzba with ID " + dto.getStudentsaSluzba().getId() + " not found."));
            kalendar.setStudentskaSluzba(studentskaSluzba);
        } else {
            kalendar.setStudentskaSluzba(null); 
        }

        List<EvaluacijaZnanja> evaluacijeZnanja = new ArrayList<>();
        if (dto.getEvaluacijaZnanja() != null) {
            for (EvaluacijaZnanjaDTO ezDTO : dto.getEvaluacijaZnanja()) {
                if (ezDTO.getId() != null) {
                    EvaluacijaZnanja existingEvaluacija = evaluacijaZnanjaRepository.findById(ezDTO.getId())
                        .orElseThrow(() -> new RuntimeException("EvaluacijaZnanja not found with id " + ezDTO.getId()));
                    existingEvaluacija.setKalendar(kalendar); 
                    evaluacijeZnanja.add(existingEvaluacija);
                }
            }
        }
        kalendar.setEvaluacijaZnanja(evaluacijeZnanja);

        
        List<GrupaStudenata> grupeStudenata = new ArrayList<>();
        if (dto.getGrupaStudenata() != null) {
            for (GrupaStudenataDTO gsDTO : dto.getGrupaStudenata()) {
                if (gsDTO.getId() != null) {
                    GrupaStudenata existingGrupa = grupaStudenataRepository.findById(gsDTO.getId())
                        .orElseThrow(() -> new RuntimeException("GrupaStudenata not found with id " + gsDTO.getId()));
                    existingGrupa.setKalendar(kalendar); 
                    grupeStudenata.add(existingGrupa);
                }
            }
        }
        kalendar.setGrupaStudenata(grupeStudenata);

        
        List<TerminNastave> terminiNastave = new ArrayList<>();
        if (dto.getTerminiNastave() != null) {
            for (TerminNastaveDTO tnDTO : dto.getTerminiNastave()) {
                if (tnDTO.getId() != null) {
                    TerminNastave existingTermin = terminNastaveRepository.findById(tnDTO.getId())
                        .orElseThrow(() -> new RuntimeException("TerminNastave not found with id " + tnDTO.getId()));
                    existingTermin.setKalendar(kalendar); 
                    terminiNastave.add(existingTermin);
                }
            }
        }
        kalendar.setTerminiNastave(terminiNastave);


        return kalendar;
    }

    public Kalendar getById(Long id) {
        return kalendarRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Kalendar sa id " + id + " nije pronađen."));
    }
    
    public KalendarDTO findByNastavnikId(Long nastavnikId) {
        Kalendar kalendar = kalendarRepository.findKalendarByNastavnikId(nastavnikId);
        return convertToDTO(kalendar);
    }


    @Override
    protected void updateEntityFromDto(KalendarDTO dto, Kalendar entity) {
        
        entity.setVidljiv(dto.getVidljiv() != null ? dto.getVidljiv() : true);

        
        if (dto.getStudentsaSluzba() != null && dto.getStudentsaSluzba().getId() != null) {
            studentskaSluzbaRepository.findById(dto.getStudentsaSluzba().getId())
                .ifPresent(entity::setStudentskaSluzba); 
        } else {
            entity.setStudentskaSluzba(null); 
        }

       
        List<EvaluacijaZnanja> updatedEvaluacijeZnanja = new ArrayList<>();
        if (dto.getEvaluacijaZnanja() != null) {
            for (EvaluacijaZnanjaDTO ezDTO : dto.getEvaluacijaZnanja()) {
                if (ezDTO.getId() != null) {
                    evaluacijaZnanjaRepository.findById(ezDTO.getId())
                        .ifPresent(foundEz -> {
                            foundEz.setKalendar(entity); 
                            updatedEvaluacijeZnanja.add(foundEz);
                        });
                }
            }
        }
        entity.getEvaluacijaZnanja().clear();
        entity.getEvaluacijaZnanja().addAll(updatedEvaluacijeZnanja);


        
        List<GrupaStudenata> updatedGrupeStudenata = new ArrayList<>();
        if (dto.getGrupaStudenata() != null) {
            for (GrupaStudenataDTO gsDTO : dto.getGrupaStudenata()) {
                if (gsDTO.getId() != null) {
                    grupaStudenataRepository.findById(gsDTO.getId())
                        .ifPresent(foundGs -> {
                            foundGs.setKalendar(entity); 
                            updatedGrupeStudenata.add(foundGs);
                        });
                }
            }
        }
        entity.getGrupaStudenata().clear();
        entity.getGrupaStudenata().addAll(updatedGrupeStudenata);

        
        List<TerminNastave> updatedTerminiNastave = new ArrayList<>();
        if (dto.getTerminiNastave() != null) {
            for (TerminNastaveDTO tnDTO : dto.getTerminiNastave()) {
                if (tnDTO.getId() != null) {
                    terminNastaveRepository.findById(tnDTO.getId())
                        .ifPresent(foundTn -> {
                            foundTn.setKalendar(entity); 
                            updatedTerminiNastave.add(foundTn);
                        });
                }
            }
        }
        entity.getTerminiNastave().clear();
        entity.getTerminiNastave().addAll(updatedTerminiNastave);
    }
}