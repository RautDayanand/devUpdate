package dev_update.backend.controller;

import dev_update.backend.model.Tech;
import dev_update.backend.service.TechService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tech")
public class TechController {

    @Autowired
    private TechService service;

    @PostMapping("/create")
    public Tech addTech(@RequestBody Tech t){
        return service.addTech(t);
    }

    @GetMapping("/getAll")
    public List<Tech> getAllTech(){
        return service.getAllTech();
    }

}
