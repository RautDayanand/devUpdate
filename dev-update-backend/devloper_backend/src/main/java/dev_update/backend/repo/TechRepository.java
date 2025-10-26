package dev_update.backend.repo;

import dev_update.backend.model.Tech;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TechRepository extends JpaRepository<Tech,Long> {



}
