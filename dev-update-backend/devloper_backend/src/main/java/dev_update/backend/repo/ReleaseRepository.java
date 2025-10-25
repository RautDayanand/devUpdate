package dev_update.backend.repo;

import dev_update.backend.model.Release;
import dev_update.backend.model.Tech;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReleaseRepository extends JpaRepository<Release,Long> {

    Release findTopByTechOrderByPublishedAtDesc(Tech tech);


}
