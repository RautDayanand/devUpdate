package dev_update.backend.service;

import dev_update.backend.model.Tech;
import dev_update.backend.repo.TechRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TechService {

    @Autowired
    private TechRepository techRepo;

    public Tech addTech(Tech t){
        return techRepo.save(t);
    }

    public List<Tech> getAllTech(){
        return techRepo.findAll();
    }
}
