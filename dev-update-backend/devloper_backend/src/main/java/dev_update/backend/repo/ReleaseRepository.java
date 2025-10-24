package dev_update.backend.repo;

import dev_update.backend.model.Release;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReleaseRepository extends JpaRepository<Release,Long> {
}
