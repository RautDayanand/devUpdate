package dev_update.backend.repo;

import dev_update.backend.model.Tech;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TechRepository extends JpaRepository<Tech,Long> {
}
