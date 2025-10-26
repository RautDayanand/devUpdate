package dev_update.backend.service;

import dev_update.backend.model.Release;
import dev_update.backend.model.Tech;
import dev_update.backend.repo.ReleaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReleaseService {

    @Autowired
    private  ReleaseRepository releaseRepo;

    public List<Release> getReleaseByTech(Long techId){
        return releaseRepo.findAll()
                .stream()
                .filter(r->r.getTech().getId().equals(techId))
                .toList();
    }


    public List<Release>getAllRelease(){
        return releaseRepo.findAll();
    }

    public Release createRelease(Release rel){
        return releaseRepo.save(rel);
    }

}
