package dev_update.backend.controller;

import dev_update.backend.model.Release;
import dev_update.backend.service.ReleaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.ListResourceBundle;

@RestController
@RequestMapping("/api/releases")
public class ReleaseController {

    @Autowired
    private ReleaseService releaseService;

    @GetMapping("/tech/{techId}")
    public List<Release>getReleasedByTech(@PathVariable Long techId){
        return releaseService.getReleaseByTech(techId);
    }

    @GetMapping("/getAll")
    public List<Release>getAllRelease(){
        return releaseService.getAllRelease();
    }

    @PostMapping("/create")
    public Release createRelease(@RequestBody Release rel){
        return releaseService.createRelease(rel);
    }

}
