package dev_update.backend.repo;

import dev_update.backend.model.AiSummary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AiSummaryRepository extends JpaRepository<AiSummary,Long> {
}
