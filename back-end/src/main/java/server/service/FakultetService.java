//package server.service;
//
//import java.util.ArrayList;
//import java.util.HashSet;
//import java.util.List;
//import java.util.Set;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Lazy;
//import org.springframework.data.repository.CrudRepository;
//import org.springframework.stereotype.Service;
//
//import server.DTOs.UniverzitetDTO;
//import server.DTOs.DepartmanDTO;
//import server.DTOs.FakultetDTO;
//
//import server.model.Univerzitet;
//import server.model.Departman;
//import server.model.Fakultet;
//import server.repository.FakultetRepository;
//
//@Service
//public class FakultetService extends BaseService<Fakultet, FakultetDTO, Long> {
//
//	@Autowired
//	private FakultetRepository fakultetRepository;
//
//	@Autowired
//	@Lazy
//	private DepartmanService departmanService;
//
//	@Autowired
//	@Lazy
//	private UniverzitetService univerzitetService;
//
//	@Override
//	protected CrudRepository<Fakultet, Long> getRepository() {
//		return fakultetRepository;
//	}
//
//	@Override
//	protected FakultetDTO convertToDTO(Fakultet entity) {
//
//		ArrayList<DepartmanDTO> departmani = new ArrayList<>();
//
//		for (Departman s : entity.getDepartmani()) {
//			DepartmanDTO e = departmanService.convertToDTO(s);
//			departmani.add(e);
//		}
//
//		return new FakultetDTO(entity.getId(), entity.getNaziv(),
//				new UniverzitetDTO(entity.getUniverzitet().getId(), entity.getUniverzitet().getNaziv(), null, null,
//						null, entity.getUniverzitet().getEmail(), entity.getUniverzitet().getKontakt(),
//						entity.getUniverzitet().getVidljiv()),
//				departmani, entity.getVidljiv());
//
//	}
//	
////	@Override
////	protected Fakultet convertToEntity(FakultetDTO dto) {
////	    Fakultet fakultet = new Fakultet();
////	    fakultet.setId(dto.getId());
////	    fakultet.setNaziv(dto.getNaziv());
////	    fakultet.setVidljiv(dto.getVidljiv());
////	    fakultet.setUniverzitet(
////	        new Univerzitet(dto.getUniverzitet().getId(), dto.getUniverzitet().getNaziv(), null, null, null,
////	                        dto.getUniverzitet().getEmail(), dto.getUniverzitet().getKontakt(),
////	                        dto.getUniverzitet().getVidljiv())
////	    );
////
////	    ArrayList<Departman> departmani = new ArrayList<>();
////
////	    if (dto.getDepartmani() != null) {
////	        for (DepartmanDTO dDto : dto.getDepartmani()) {
////	            if (dDto.getId() != null) {
////
////	                Departman existingDepartman = departmanService.getRepository().findById(dDto.getId())
////	                    .orElseThrow(() -> new RuntimeException("Departman not found with id " + dDto.getId()));
////
////
////	                existingDepartman.setFakultet(fakultet);
////
////	                departmani.add(existingDepartman);
////	            }
////	        }
////	    }
////
////	    fakultet.setDepartmani(departmani);
////
////	    return fakultet;
////	}
//	
//	@Override
//    protected Fakultet convertToEntity(FakultetDTO dto) {
//        Fakultet fakultet = new Fakultet();
//        fakultet.setId(dto.getId());
//        fakultet.setNaziv(dto.getNaziv());
//        fakultet.setVidljiv(dto.getVidljiv());
//
//
//        List<Departman> departmani = new ArrayList<>(); // Use Set for @OneToMany collections
//
//        if (dto.getDepartmani() != null) {
//            for (DepartmanDTO dDto : dto.getDepartmani()) {
//                Departman departman;
//                if (dDto.getId() != null) {
//                    departman = departmanService.getRepository().findById(dDto.getId())
//                        .orElseThrow(() -> new RuntimeException("Departman not found with id " + dDto.getId()));
//                } else {
//                    departman = departmanService.convertToEntity(dDto);
//                }
//                departman.setFakultet(fakultet);
//                departmani.add(departman);
//            }
//        }
//        fakultet.setDepartmani(departmani);
//        return fakultet;
//    }
//
//	@Override
//	protected void updateEntityFromDto(FakultetDTO dto, Fakultet entity) {
//	    entity.setNaziv(dto.getNaziv());
//	    entity.setVidljiv(dto.getVidljiv());
//
//	    if (dto.getUniverzitet() != null && dto.getUniverzitet().getId() != null) {
//	        var existingUniverzitet = univerzitetService.getRepository().findById(dto.getUniverzitet().getId())
//	            .orElseThrow(() -> new RuntimeException("Univerzitet not found with id " + dto.getUniverzitet().getId()));
//	        entity.setUniverzitet(existingUniverzitet);
//	    } else {
//	        entity.setUniverzitet(null);
//	    }
//
//	    if (dto.getDepartmani() != null) {
//	        List<Departman> updatedDepartmani = new ArrayList<>();
//
//	        for (DepartmanDTO dDto : dto.getDepartmani()) {
//	            if (dDto.getId() != null) {
//	                Departman existingDepartman = departmanService.getRepository()
//	                    .findById(dDto.getId())
//	                    .orElseThrow(() -> new RuntimeException("Departman not found with id " + dDto.getId()));
//
//	                existingDepartman.setFakultet(entity);
//	                updatedDepartmani.add(existingDepartman);
//	            }
//	        }
//	        entity.setDepartmani(updatedDepartmani);
//	    } else {
//	        entity.setDepartmani(new ArrayList<>());
//	    }
//	}
//
//
//
//}

package server.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import server.DTOs.UniverzitetDTO;
import server.DTOs.DepartmanDTO;
import server.DTOs.FakultetDTO;

import server.model.Univerzitet;
import server.model.Departman;
import server.model.Fakultet;
import server.repository.DepartmanRepository;
import server.repository.FakultetRepository;
import server.repository.UniverzitetRepository;

@Service
public class FakultetService extends BaseService<Fakultet, FakultetDTO, Long> {

    @Autowired
    private FakultetRepository fakultetRepository;

    @Autowired
    @Lazy
    private DepartmanService departmanService;

    @Autowired
    @Lazy
    private UniverzitetService univerzitetService;

    @Autowired
    private UniverzitetRepository univerzitetRepository;

    @Autowired
    private DepartmanRepository departmanRepository;

    @Override
    protected CrudRepository<Fakultet, Long> getRepository() {
        return fakultetRepository;
    }

    @Override
    protected FakultetDTO convertToDTO(Fakultet entity) {
        ArrayList<DepartmanDTO> departmani = new ArrayList<>();
        if (entity.getDepartmani() != null) {
            for (Departman d : entity.getDepartmani()) {
                departmani.add(departmanService.convertToDTO(d));
            }
        }

        UniverzitetDTO univerzitetDTO = null;
        if (entity.getUniverzitet() != null) {
            univerzitetDTO = new UniverzitetDTO(entity.getUniverzitet().getId(), entity.getUniverzitet().getNaziv(),
                    null, null, null, entity.getUniverzitet().getEmail(), entity.getUniverzitet().getKontakt(),
                    entity.getUniverzitet().getVidljiv());
        }

        return new FakultetDTO(entity.getId(), entity.getNaziv(), univerzitetDTO, departmani, entity.getVidljiv());
    }

    @Override
    protected Fakultet convertToEntity(FakultetDTO dto) {
        Fakultet fakultet = new Fakultet(dto.getId(), dto.getNaziv(), null, null, dto.getVidljiv());

        if (dto.getUniverzitet() == null || dto.getUniverzitet().getId() == null) {
            throw new IllegalArgumentException("Univerzitet je obavezno polje za Fakultet.");
        }
        Univerzitet univerzitet = univerzitetRepository.findById(dto.getUniverzitet().getId())
                .orElseThrow(() -> new IllegalArgumentException("Univerzitet sa ID " + dto.getUniverzitet().getId() + " ne postoji."));
        fakultet.setUniverzitet(univerzitet);

        if (dto.getDepartmani() != null) {
            List<Departman> departmaniEntities = dto.getDepartmani().stream()
                    .map(departmanDTO -> {
                        if (departmanDTO.getId() == null) {
                            Departman newDepartman = departmanService.convertToEntity(departmanDTO);
                            newDepartman.setFakultet(fakultet);
                            return departmanRepository.save(newDepartman);
                        } else {
                            Departman departman = departmanRepository.findById(departmanDTO.getId())
                                    .orElseThrow(() -> new RuntimeException("Departman sa ID " + departmanDTO.getId() + " ne postoji."));
                            departman.setFakultet(fakultet);
                            return departman;
                        }
                    })
                    .collect(Collectors.toList());
            fakultet.setDepartmani(departmaniEntities);
        }
        return fakultet;
    }

    @Override
    @Transactional
    protected void updateEntityFromDto(FakultetDTO dto, Fakultet entity) {
        if (dto.getNaziv() != null) {
            entity.setNaziv(dto.getNaziv());
        }
        if (dto.getVidljiv() != null) {
            entity.setVidljiv(dto.getVidljiv());
        }

        if (dto.getUniverzitet() == null || dto.getUniverzitet().getId() == null) {
            throw new IllegalArgumentException("Univerzitet je obavezno polje za Fakultet.");
        }
        Univerzitet univerzitet = univerzitetRepository.findById(dto.getUniverzitet().getId())
                .orElseThrow(() -> new IllegalArgumentException("Univerzitet sa ID " + dto.getUniverzitet().getId() + " ne postoji."));
        entity.setUniverzitet(univerzitet);

        if (dto.getDepartmani() != null) {
            Set<Long> currentDepartmaniIds = entity.getDepartmani().stream()
                    .map(Departman::getId)
                    .collect(Collectors.toCollection(HashSet::new));

            Set<Long> dtoDepartmaniIds = dto.getDepartmani().stream()
                    .filter(dDTO -> dDTO.getId() != null)
                    .map(DepartmanDTO::getId)
                    .collect(Collectors.toCollection(HashSet::new));

            List<Departman> departmaniToRemove = entity.getDepartmani().stream()
                    .filter(d -> !dtoDepartmaniIds.contains(d.getId()))
                    .collect(Collectors.toList());

            for (Departman departman : departmaniToRemove) {
                departmanRepository.delete(departman);
            }
            entity.getDepartmani().removeAll(departmaniToRemove);

            List<Departman> updatedDepartmaniCollection = new ArrayList<>();

            for (DepartmanDTO departmanDTO : dto.getDepartmani()) {
                Departman departman;
                if (departmanDTO.getId() == null) {
                    departman = departmanService.convertToEntity(departmanDTO);
                    departman.setFakultet(entity);
                    departman = departmanRepository.save(departman);
                } else {
                    departman = departmanRepository.findById(departmanDTO.getId())
                            .orElseThrow(() -> new RuntimeException("Departman sa ID " + departmanDTO.getId() + " ne postoji."));
                    departmanService.updateEntityFromDto(departmanDTO, departman);
                    departman.setFakultet(entity);
                }
                updatedDepartmaniCollection.add(departman);
            }
            entity.setDepartmani(updatedDepartmaniCollection);
        } else {
            if (entity.getDepartmani() != null && !entity.getDepartmani().isEmpty()) {
                departmanRepository.deleteAll(entity.getDepartmani());
                entity.getDepartmani().clear();
            }
        }
    }
}